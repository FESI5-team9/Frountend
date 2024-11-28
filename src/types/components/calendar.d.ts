type DateCellProps = {
  date: number;
  type: string;
  currentDate: Date;
  selectedDate: Date | null;
  today: Date;
  handleSelectedDate: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
};

type CalendarProp = { handleDateSelect: (date: Date) => void };

type DateStore = {
  selectedDate: Date | null;
  selectedOption: string;
  setSelectedDate: (date: Date | null) => void;
  setSelectedOption: (option: string) => void;
};
