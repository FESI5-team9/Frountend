import { create } from "zustand";

const useUserStore = create<UserStore>(set => ({
  id: null,
  email: null,
  name: null,
  nickname: null,
  image: null,
  setUser: user => set(state => ({ ...state, ...user })),
}));

export default useUserStore;
