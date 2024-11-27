"use client";

import Image from "next/image";
import { useState } from "react";

export function FilterDropDown({ filterType, options, handleFilter }: DropDownProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (textContent: string) => {
    setSelectedOption(textContent);
    handleFilter(textContent);
  };

  return (
    <div className="select-none text-[14px]" onClick={() => setIsOpen(!isOpen)}>
      {filterType === "sortFilter" ? (
        <div className="relative flex h-[36px] w-[36px] items-center justify-center rounded-[12px] border-[2px] border-[#F3F4F6] bg-white px-[12px] tablet:h-[40px] tablet:w-[128px] tablet:px-[12px] tablet:py-[8px]">
          <div className="flex h-6 w-6 items-center">
            <Image src="/images/swap_vert.png" alt={filterType} width={18} height={10} />
          </div>
          <span className="hidden tablet:block">{selectedOption}</span>
        </div>
      ) : (
        <div className="relative flex h-[36px] w-[110px] items-center justify-between rounded-[12px] border-[2px] border-[#F3F4F6] bg-white px-[12px] py-[6px] tablet:h-[40px] tablet:w-[120px] tablet:py-[8px]">
          <span>{selectedOption}</span>
          <Image src="/images/arrow_drop_down.png" alt={filterType} width={24} height={24} />
        </div>
      )}

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
    </div>
  );
}
