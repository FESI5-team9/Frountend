export default function Dropdown({ options, isOpen, handleOptionSelect }: DropdownProps) {
  return (
    <ul
      className={`${isOpen ? "block" : "hidden"} absolute z-50 mt-3 w-[110px] rounded-[12px] bg-white p-1 tablet:w-[120px]`}
    >
      {options.map((option, index) => (
        <li
          className="h-[36px] w-full select-none rounded-xl px-[12px] py-[6px] text-sm hover:bg-[#FFFACD] tablet:h-[40px] tablet:py-[8px]"
          onClick={e => handleOptionSelect(e.currentTarget.textContent as string)}
          key={index}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}
