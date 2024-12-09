import { create } from "zustand";

const useDateStore = create<DateStore>(set => ({
  firstDate: null,
  secondDate: null,
  selectedOption: "날짜 선택",
  setFirstDate: (date: Date | null) => set({ firstDate: date }),
  setSecondDate: (date: Date | null) => set({ secondDate: date }),
  setSelectedOption: (option: string) => set({ selectedOption: option }),
}));

export default useDateStore;
