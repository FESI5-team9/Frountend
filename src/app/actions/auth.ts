"use server";

import { cookies } from "next/headers";

export async function setAuthCookies(tokens: { accessToken: string; refreshToken: string }) {
  const cookieStore = cookies();

  cookieStore.set("accessToken", tokens.accessToken, {
    secure: true,
    httpOnly: false,
    path: "/",
    sameSite: "strict",
  });

  cookieStore.set("refreshToken", tokens.refreshToken, {
    secure: true,
    httpOnly: false,
    path: "/",
    sameSite: "strict",
  });
}

export async function setAccessCookies(accessToken: string) {
  const cookieStore = cookies();

  cookieStore.set("accessToken", accessToken, {
    secure: true,
    httpOnly: false,
    path: "/",
    sameSite: "strict",
  });
}
