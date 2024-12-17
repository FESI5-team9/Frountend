import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const status = request.nextUrl.searchParams.get("status");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/gatherings/${params.id}/recruit?status=${status}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${request.cookies.get("access-token")?.value}`,
      },
    },
  );

  if (response.ok) {
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } else {
    const errorData = await response.json();
    return NextResponse.json(errorData, { status: response.status });
  }
}
