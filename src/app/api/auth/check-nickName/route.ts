import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 쿼리 파라미터에서 닉네임 추출
    const { searchParams } = new URL(request.url);
    const nickname = searchParams.get("nickname");

    if (!nickname) {
      return NextResponse.json({ message: "닉네임이 제공되지 않았습니다." }, { status: 400 });
    }

    // 외부 API 호출
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/check-nickname?nickname=${nickname}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("닉네임 검증 요청 실패");
    }

    // API 응답 처리
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("닉네임 검증 중 에러:", error);
    return NextResponse.json({ message: "닉네임 검증에 실패했습니다." }, { status: 500 });
  }
}
