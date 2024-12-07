export type User = {
  id: number;
  email: string;
  name: string;
  nickname?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type PostUsers = Pick<User, "email" | "nickname" | "name"> & {
  password: string;
};

export type Login = Pick<User, "email"> & {
  password: string;
};

export type LoginRes = {
  accessToken: string;
  refreshToken: string;
};

export type PutUsers = Pick<User, "nickname"> & {
  image?: File;
};
