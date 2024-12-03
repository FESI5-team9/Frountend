export default function Card() {
  return (
    <div className="flex h-[352px] w-full flex-col gap-4">
      <div className="rounded-3xl">이미지</div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="h-8 w-[76px] rounded-2xl bg-white">이용 예정</div>
          <div className="w-[76px] rounded-2xl bg-white">개설 확정</div>
        </div>
        <div className="flex flex-col gap-[6px]">
          <span>달램핏 오피스 스트레칭 | 을지로 3가</span>
          <span className="flex gap-3">1월 7일 - 17:30</span>
        </div>
      </div>
      <button className="flex">예약 취소하기</button>
    </div>
  );
}
