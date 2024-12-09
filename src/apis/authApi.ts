import { setAuthCookies } from "@/app/actions/auth";
import useUserStore from "@/store/userStore";
import { Login, LoginRes, PostUsers, PutUsers, User } from "@/types/api/authApi";
import fetchInstance from "./fetchInstance";

// 회원가입
export async function signup(body: PostUsers) {
  const data = await fetchInstance.post<User>("/auth/signup", body);
  return data;
}

// 유저 정보 조회
export async function getUserProfile(options?: { next?: NextFetchRequestConfig }) {
  const data = await fetchInstance.get<User>("/auth/user", options);
  return data;
}

// 로그인
export async function signin(body: Login) {
  const data = await fetchInstance.post<LoginRes>("/auth/signin", body);

  await setAuthCookies(data.accessToken, data.refreshToken);

  const { id, email, nickname, name, image } = await getUserProfile();

  const userStore = useUserStore.getState();
  userStore.setUser({
    id,
    email,
    nickname,
    name,
    image,
  });

  return data;
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
  const data = await fetchInstance.put<User>("/auth/user", formData);

  const userStore = useUserStore.getState();
  userStore.setUser({
    id: data.id,
    email: data.email,
    nickname: data.nickname,
    name: data.name,
    image: data.image,
  });
  return data;
}
