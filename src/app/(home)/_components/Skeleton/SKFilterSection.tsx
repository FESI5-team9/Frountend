export default function SKFilterSection() {
  return (
    <div className="mt-2 flex flex-row justify-between tablet:mt-4">
      <div className="flex flex-row tablet:gap-4">
        {/* 지역 필터 스켈레톤 */}
        <div className="h-[36px] w-[120px] rounded bg-gray-300"></div>
        {/* 달력 필터 스켈레톤 */}
        <div className="h-[36px] w-[160px] rounded bg-gray-300"></div>
      </div>
      {/* 정렬 방향 필터 스켈레톤 */}
      <div className="h-[36px] w-[120px] rounded bg-gray-300"></div>
    </div>
  );
}
