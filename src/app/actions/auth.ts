"use server";

import { cookies } from "next/headers";

interface Tokens {
  "access-token": string;
  "refresh-token": string;
}

export async function setAuthCookies(tokens: Tokens) {
  const cookieStore = cookies();

  cookieStore.set("access-token", tokens["access-token"], {
    secure: true,
    httpOnly: false,
    path: "/",
    sameSite: "strict",
  });

  cookieStore.set("refresh-token", tokens["refresh-token"], {
    secure: true,
    httpOnly: false,
    path: "/",
    sameSite: "strict",
  });
}

export async function setAccessCookies(accessToken: string) {
  const cookieStore = cookies();

  cookieStore.set("access-token", accessToken, {
    secure: true,
    httpOnly: false,
    path: "/",
    sameSite: "strict",
  });
}
