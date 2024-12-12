export default function Dropdown({ options, isOpen, onSelectOption, filterType }: DropdownProps) {
  return (
    <ul
      className={`${isOpen ? "block" : "hidden"} ${filterType === "selectionFilter" ? "w-[110px]" : "w-[120px]"} absolute z-50 mt-3 rounded-[12px] border-[2px] border-[#F3F4F6] bg-white p-1`}
    >
      {options.map((option, index) => (
        <li
          className="h-[36px] w-full select-none rounded-xl px-[12px] py-[6px] text-sm hover:bg-[#FFFACD] tablet:h-[40px] tablet:py-[8px]"
          onClick={() => onSelectOption(option)}
          key={index}
        >
          {option.ko}
        </li>
      ))}
    </ul>
  );
}
