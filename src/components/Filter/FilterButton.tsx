import Image from "next/image";

export default function FilterButton({ selectedOption, filterType, onToggle }: FilterButtonProps) {
  return (
    <div
      onClick={onToggle}
      className="relative flex h-[36px] w-[120px] select-none items-center justify-between rounded-[12px] border-[2px] border-[#F3F4F6] bg-white px-[12px] py-[6px] text-sm tablet:h-[40px] tablet:w-[124px] tablet:py-[8px]"
    >
      {filterType === "sortFilter" && (
        <div className="flex h-6 w-6 items-center">
          <Image src="/images/filter/swap_vert.svg" alt={filterType} width={18} height={10} />
        </div>
      )}
      <span>{selectedOption ? selectedOption.ko : "날짜 선택"}</span>
      {filterType === "selectionFilter" && (
        <div className="flex h-6 w-6 items-center">
          <Image src="/images/filter/arrow_drop_down.svg" alt={filterType} width={24} height={24} />
        </div>
      )}
    </div>
  );
}
