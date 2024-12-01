export type User = {
  id: number;
  email: string;
  name: string;
  nickName?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type PostUsers = Pick<User, "email" | "nickName" | "name"> & {
  password: string;
};

export type Login = Pick<User, "email"> & {
  password: string;
};

export type LoginRes = {
  accessToken: string;
  refreshToken: string;
};

export type PutUsers = Partial<Pick<User, "nickName" | "image">>;
