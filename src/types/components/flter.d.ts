type FilterType = "sortFilter" | "selectionFilter";

type FilterProps = {
  filterType: FilterType;
  selectedOption: string;
  style: string;
};

type DropDownProps = {
  filterType: FilterType;
  options: string[];
  handleFilter: (currentOption: string) => void;
};
