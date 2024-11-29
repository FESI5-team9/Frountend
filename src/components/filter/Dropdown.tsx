export default function Dropdown({ options, isOpen, handleOptionSelect }: DropdownProps) {
  return (
    <ul className={`${isOpen ? "block" : "hidden"} absolute z-50 mt-3 rounded-[12px] bg-white`}>
      {options.map((option, index) => (
        <li
          className="h-[36px] w-[110px] px-[12px] py-[6px] first:rounded-t-[12px] last:rounded-b-[12px] hover:bg-slate-100 tablet:h-[40px] tablet:w-[120px] tablet:py-[8px]"
          onClick={e => handleOptionSelect(e.currentTarget.textContent as string)}
          key={index}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}
