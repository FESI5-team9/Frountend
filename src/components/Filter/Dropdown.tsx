export default function Dropdown({ options, isOpen, onSelectOption }: DropdownProps) {
  return (
    <ul
      className={`${isOpen ? "block" : "hidden"} absolute z-50 mt-3 w-[110px] rounded-[12px] border-2 border-gray-100 bg-white p-1 tablet:w-[120px]`}
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
