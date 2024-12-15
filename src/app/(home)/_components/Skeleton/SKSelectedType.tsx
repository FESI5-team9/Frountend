export default function SKSelectedType() {
  return (
    <div className="mb-2 flex justify-between border-b-2 pb-2">
      {/* 모임 만들기 버튼 자리 */}
      <div className="h-[36px] w-[127px] rounded bg-gray-300"></div>
      {/* 카테고리 리스트 */}
      <ul className="flex gap-3 p-2 text-lg tablet:justify-between tablet:gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={index}
            className="flex list-none items-center gap-[3px] border-b-2 border-transparent text-gray-300"
          >
            <div className="h-[20px] w-[60px] rounded bg-gray-300"></div>
            <div className="hidden h-[20px] w-[18px] rounded bg-gray-300 tablet:block"></div>
          </li>
        ))}
      </ul>
      {/* 빈 공간 */}
      <div className="h-[36px] w-[127px]"></div>
    </div>
  );
}
