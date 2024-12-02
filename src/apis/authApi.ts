import { setAuthCookies } from "@/app/actions/auth";
import { Login, LoginRes, PostUsers, PutUsers, User } from "@/types/api/authApi";
import fetchInstance from "./fetchInstance";

// 회원가입
export async function signup(body: PostUsers) {
  const data = await fetchInstance.post<User>("/auth/signup", body);
  return data;
}

// 로그인
export async function signin(body: Login) {
  const data = await fetchInstance.post<LoginRes>("/auth/signin", body);
  await setAuthCookies(data.accessToken, data.refreshToken);
  return data;
}

// 유저 정보 조회
export async function getUserProfile() {
  const data = await fetchInstance.get<User>("/auth/user");
  return data;
}

// 유저 정보 수정
export async function updateUserProfile(body: PutUsers) {
  const data = await fetchInstance.put<User>("/auth/user", body);
  return data;
}
