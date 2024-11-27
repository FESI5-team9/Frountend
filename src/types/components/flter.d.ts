type FilterType = "sortFilter" | "selectionFilter";

type DropDownProps = {
  filterType: FilterType;
  options: string[];
  handleFilter: (currentOption: string) => void;
};
