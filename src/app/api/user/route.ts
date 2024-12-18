import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("access-token")?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
  if (response.ok) {
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } else {
    const errorData = await response.json();
    return NextResponse.json(errorData, { status: response.status });
  }
}

export async function PUT(request: NextRequest) {
  const formData = await request.formData();

  // 외부 API 호출 (또는 서버 로직 실행)
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${request.cookies.get("access-token")?.value}`,
    },
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } else {
    const errorData = await response.json();
    return NextResponse.json(errorData, { status: response.status });
  }
}
