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
  setFirstDate: (date: string | null) => void;
  setSecondDate: (date: string | null) => void;
};
