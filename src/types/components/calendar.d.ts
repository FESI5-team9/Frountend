type DateCellProps = {
  date: number;
  type: string;
  currentDate: Date;
  selectedDate: Date;
  today: Date;
  handleSelectedDate: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
};

type CalendarProp = { getSelectedDate: (date: Date) => void };
