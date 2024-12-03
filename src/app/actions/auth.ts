"use server";

import { cookies } from "next/headers";

export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = cookies();

  cookieStore.set("accessToken", accessToken, {
    secure: true,
    sameSite: "strict",
  });

  cookieStore.set("refreshToken", refreshToken, {
    secure: true,
    sameSite: "strict",
  });
}
