import Chip from "@/components/chip";
import { formatToKoreanTime } from "@/utils/date";

export default function page() {
  const serverData = {
    createAt: "2024-11-27T15:30:00Z",
  };
  // dateString 예시: "yyyy년 MM월 dd일 HH시 mm분"
  const koreanTime = formatToKoreanTime(serverData.createAt, "MM월 dd일");
  const koreanMinute = formatToKoreanTime(serverData.createAt, "HH : mm");

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <div className="border-1 bg-yellow flex border-black">{koreanTime}</div>
      <div>{koreanMinute}</div>

      {/* 칩 더미 */}
      <div className="flex items-center justify-between gap-2">
        <Chip type="state" bgColor="yellow" textColor="black">
          {koreanMinute}
        </Chip>
        <Chip type="default" bgColor="black" textColor="white">
          글자 수 테스트 1231.
        </Chip>
        <Chip type="time" bgColor="white" textColor="yellow">
          {koreanTime}
        </Chip>
        <Chip type="default" bgColor="black" textColor="white" shadow={true}>
          shadow
        </Chip>
      </div>
    </div>
  );
}
