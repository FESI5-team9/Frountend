type FilterProps = {
  filterType: "location" | "sort";
  selectedOption: string;
  style: string;
};

type DropDownProps = {
  filterType: "location" | "sort";
  handleFilter: (currentOption: string) => void;
};
