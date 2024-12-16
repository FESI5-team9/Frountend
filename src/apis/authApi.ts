import useUserStore from "@/store/userStore";
import { Login, PostUsers, PutUsers, User } from "@/types/api/authApi";
import { setAuthCookies } from "../app/actions/auth";
import fetchInstance from "./fetchInstance";

// 회원가입
export async function signup(body: PostUsers) {
  const data = await fetchInstance.post<User>("/auth/signup", body);
  return data;
}

// 유저 정보 조회
export async function getUserProfile() {
  const data = await fetchInstance.get<User>("/user");
  return data;
}

// 로그인
export async function signin(body: Login) {
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const result = await response.json();
    await setAuthCookies({
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken,
    });
  }

  return response;
}
// 유저 정보 수정
export async function updateUserProfile(body: PutUsers) {
  const formData = new FormData();
  if (body.nickname) {
    formData.append("nickname", body.nickname);
  }
  if (body.image) {
    formData.append("image", body.image);
  }
  const data = await fetchInstance.put<User>("/user", formData);

  const userStore = useUserStore.getState();
  userStore.setUser({
    id: data.id,
    email: data.email,
    nickname: data.nickname,
    image: data.image,
  });
  return data;
}

// 이메일 검증
export async function checkEmail(email: string) {
  const data = await fetchInstance.get<{ message: string }>(`/auth/check-email?email=${email}`);
  return data;
}

// 닉네임 검증
export async function checkNickName(nickname: string) {
  const data = await fetchInstance.get<{ message: string }>(
    `/auth/check-nickname?nickname=${nickname}`,
  );
  return data;
}
