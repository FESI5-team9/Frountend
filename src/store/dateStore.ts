import { create } from "zustand";

const useDateStore = create<DateStore>(set => ({
  selectedDate: null,
  selectedOption: "날짜 선택",
  setSelectedDate: date => set({ selectedDate: date }),
  setSelectedOption: option => set({ selectedOption: option }),
}));

export default useDateStore;
