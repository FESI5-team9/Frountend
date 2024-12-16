import { create } from "zustand";

const useDateStore = create<DateStore>(set => ({
  firstDate: null,
  secondDate: null,
  setFirstDate: (date: string | null) => set({ firstDate: date }),
  setSecondDate: (date: string | null) => set({ secondDate: date }),
}));

export default useDateStore;
