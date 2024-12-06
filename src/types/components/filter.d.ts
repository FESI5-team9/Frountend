type FilterType = "sortFilter" | "selectionFilter";

type OptionType = { ko: string; eng: string };

type FilterDropdownProps = {
  filterType: FilterType;
  options: OptionType[];
  onSelectFilterOption: (currentOption: string) => void;
};

type FilterButtonProps = {
  selectedOption?: OptionType;
  selectedDateOption?: string;
  filterType: string;
  onToggle: () => void;
};

type DropdownProps = {
  options: OptionType[];
  isOpen: boolean;
  selectedOption: OptionType;
  onSelectOption: (textContent: OptionType) => void;
  filterType: string;
};
