import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  id: number | null;
  email: string | null;
  name: string | null;
  nickname: string | null;
  image: string | null;
  setUser: (user: Partial<UserStore>) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      id: null,
      email: null,
      name: null,
      nickname: null,
      image: null,
      setUser: user => set(state => ({ ...state, ...user })),
    }),
    {
      name: "userData",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
