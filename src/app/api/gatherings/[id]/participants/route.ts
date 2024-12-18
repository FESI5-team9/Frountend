import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const queryPrefix = queryString ? "?" : "";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/gatherings/${params.id}/participants${queryPrefix}${queryString}`,
    {
      method: "GET",
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
