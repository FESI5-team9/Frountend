type DateCellProps = {
  date: number;
  type: string;
  currentDate: Date;
  firstDate: string | null;
  secondDate: string | null;
  today: Date;
  onSelectDate: () => void;
  onNavigateToPrevMonth: () => void;
  onNavigateToNextMonth: () => void;
};

type CalendarProps = {
  selectMode?: string;
  multipleDates: boolean;
};

type DateStore = {
  firstDate: string | null;
  secondDate: string | null;
  selectedOption: string; // 드롭다운 선택된 날짜 표시용
  setFirstDate: (date: string | null) => void;
  setSecondDate: (date: string | null) => void;
  setSelectedOption: (option: string) => void; // 날짜 선택 시 옵션 변경
};
