import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("access-token")?.value;
    const newRequest = new Request(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
