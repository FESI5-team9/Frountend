import { NextRequest, NextResponse } from "next/server";

interface SignInRequestBody {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}
interface TokenResponse {
  "refresh-token": string;
  "access-token": string;
}

function parseRefreshToken(cookieString: string | null): string {
  if (!cookieString) {
    throw new Error("쿠키 문자열이 없습니다.");
  }

  const refreshTokenMatch = cookieString.match(/refresh-token=([^;]+)/);
  if (!refreshTokenMatch) {
    throw new Error("리프레시 토큰을 찾을 수 없습니다.");
  }

  return decodeURIComponent(refreshTokenMatch[1]);
}

async function getTokensFromSigninApi(signInData: SignInRequestBody): Promise<TokenResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`, {
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
    "refresh-token": refreshToken,
    "access-token": accessTokenResponse.accessToken,
  };
}

export async function POST(request: NextRequest) {
  try {
    const requestBody: SignInRequestBody = await request.json();
    const tokens = await getTokensFromSigninApi(requestBody);
    return NextResponse.json({
      data: {
        "refresh-token": tokens["refresh-token"],
        "access-token": tokens["access-token"],
      },
    });
  } catch (error) {
    console.error(":", error);
    return NextResponse.json({ message: "로그인 실패" }, { status: 500 });
  }
}
