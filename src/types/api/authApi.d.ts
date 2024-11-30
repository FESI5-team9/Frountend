export type PostUsers = {
  email: string;
  password: string;
  nickName: string;
  name: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  nickName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Login = {
  email: string;
  password: string;
};

export type LoginRes = {
  accessToken: string;
  refreshToken: string;
};

export type PutUsers = {
  nickName: string;
  image: string;
};
