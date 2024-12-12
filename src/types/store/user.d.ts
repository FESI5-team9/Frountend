type UserStore = {
  id: number | null;
  email: string | null;
  nickname: string | null;
  image?: string | null;
  setUser: (user: Partial<UserStore>) => void;
};
