import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const newRequest = new Request(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${request.cookies.get("access-token")?.value}`,
      },
    });

    const response = await fetch(newRequest);

    if (!response.ok) {
      throw new Error("사용자 정보 조회 실패");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    return NextResponse.json({ message: "사용자 정보 조회에 실패했습니다." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();

    // 외부 API 호출 (또는 서버 로직 실행)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${request.cookies.get("access-token")?.value}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("유저 정보 수정 실패");
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("유저 정보 수정 중 에러:", error);
    return NextResponse.json({ message: "유저 정보 수정에 실패했습니다." }, { status: 500 });
  }
}
