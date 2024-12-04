type DateCellProps = {
  date: number;
  type: string;
  currentDate: Date;
  firstDate: Date | null;
  secondDate: Date | null;
  today: Date;
  handleSelectedDate: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
};

type CalendarProps = {
  selectMode?: string;
  handleDateSelect?: (date: Date) => void;
  multipleDates: boolean;
};

type DateStore = {
  firstDate: Date | null;
  secondDate: Date | null;
  selectedOption: string; // 드롭다운 선택된 날짜 표시용
  setFirstDate: (date: Date | null) => void;
  setSecondDate: (date: Date | null) => void;
  setSelectedOption: (option: string) => void; // 날짜 선택 시 옵션 변경
};
