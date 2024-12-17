import { NextRequest, NextResponse } from "next/server";

interface SignInRequestBody {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

async function getTokensFromSigninApi(signInData: SignInRequestBody): Promise<{
  refreshToken: string;
  accessToken: string;
}> {
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
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const refreshToken = parseRefreshToken(cookieString);

  const accessTokenResponse: SignInResponse = await response.json();

  return {
    refreshToken,
    accessToken: accessTokenResponse.accessToken,
  };
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

export async function POST(request: NextRequest) {
  try {
    const requestBody: SignInRequestBody = await request.json();
    const { refreshToken, accessToken } = await getTokensFromSigninApi(requestBody);

    return NextResponse.json({
      data: {
        refreshToken,
        accessToken,
      },
    });
  } catch (error) {
    console.error("로그인 실패:", error);
    return NextResponse.json({ message: "로그인 실패" }, { status: 500 });
  }
}
