import { NextRequest, NextResponse } from "next/server";

interface AccessTokenResponse {
  accessToken: string;
}

async function getTokensFromSigninApi(refreshToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/v2/managed-access-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }), // 객체로 감싸기
  });

  const TokenResponse: AccessTokenResponse = await response.json();

  return {
    accessToken: TokenResponse.accessToken,
  };
}

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refresh-token")?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: "Refresh token not found" }, { status: 401 });
    }

    const { accessToken } = await getTokensFromSigninApi(refreshToken);

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("access-token", accessToken, {
      secure: true,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 30, // 30분
    });

    return response;
  } catch (error) {
    console.error("로그인 실패:", error);
    return NextResponse.json({ message: "로그인 실패" }, { status: 500 });
  }
}
