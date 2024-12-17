import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 쿼리 파라미터에서 이메일 추출
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "이메일이 제공되지 않았습니다." }, { status: 400 });
    }

    // 외부 API 호출
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/check-email?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("이메일 검증 요청 실패");
    }

    // API 응답 처리
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("이메일 검증 중 에러:", error);
    return NextResponse.json({ message: "이메일 검증에 실패했습니다." }, { status: 500 });
  }
}
