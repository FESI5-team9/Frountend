type FilterType = "sortFilter" | "selectionFilter";

type DropDownProps = {
  filterType: FilterType;
  options: string[];
  handleFilter: (currentOption: string) => void;
};

type FilterButtonProps = {
  selectedOption?: string;
  filterType: string;
  onClick: () => void;
};

type DropdownProps = {
  options: string[];
  isOpen: boolean;
  selectedOption: string;
  handleOptionSelect: (textContent: string) => void;
  filterType: string;
};
