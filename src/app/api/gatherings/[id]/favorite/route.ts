import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/gatherings/${params.id}/favorite`,
    {
      method: "POST",
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/gatherings/${params.id}/favorite`,
    {
      method: "DELETE",
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
