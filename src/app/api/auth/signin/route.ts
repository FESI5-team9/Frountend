import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface SignInRequestBody {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

interface ApiResponse {
  message: string;
}

type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "none" | "lax" | "strict";
  path: string;
  expires: Date;
};

function parseRefreshToken(cookieString: string | null): string {
  if (!cookieString) {
    throw new Error("쿠키 문자열이 없습니다.");
  }

  // refresh_token= 다음부터 첫 번째 ; 까지의 값을 추출
  const refreshTokenMatch = cookieString.match(/refresh-token=([^;]+)/);
  if (!refreshTokenMatch) {
    throw new Error("리프레시 토큰을 찾을 수 없습니다.");
  }

  // URL 디코딩하여 실제 토큰 값 추출
  return decodeURIComponent(refreshTokenMatch[1]);
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  const requestBody: SignInRequestBody = await request.json();

  async function getTokensFromSigninApi(signInData: SignInRequestBody): Promise<{
    refreshToken: string;
    accessToken: string;
  }> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      if (!response.ok) {
        throw new Error("로그인 요청 실패");
      }

      const cookieString = response.headers.get("Set-Cookie");
      const refreshToken = parseRefreshToken(cookieString);

      const accessTokenResponse: SignInResponse = await response.json();

      return {
        refreshToken,
        accessToken: accessTokenResponse.accessToken,
      };
    } catch (error) {
      console.error("로그인 실패:", error);
      throw new Error("로그인 실패");
    }
  }

  const { refreshToken, accessToken } = await getTokensFromSigninApi(requestBody);

  const response = NextResponse.json<ApiResponse>({ message: "로그인 성공" });

  const refreshTokenExpirationDate = new Date();
  refreshTokenExpirationDate.setDate(refreshTokenExpirationDate.getDate() + 7);

  const refreshTokenOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: refreshTokenExpirationDate,
  };

  response.cookies.set("refresh_token", refreshToken, refreshTokenOptions);

  const accessTokenExpirationDate = new Date();
  accessTokenExpirationDate.setMinutes(accessTokenExpirationDate.getMinutes() + 30);

  const accessTokenOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: accessTokenExpirationDate,
  };

  response.cookies.set("access_token", accessToken, accessTokenOptions);

  return response;
}
