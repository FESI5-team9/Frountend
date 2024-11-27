import { ChipProps } from "@/types/components/chip";

export default function Chip({
  type,
  bgColor = "yellow",
  textColor = "black",
  shadow = false,
  children,
}: ChipProps) {
  // 기본 스타일.
  const baseClass = "flex items-center justify-center px-2 py-1 text-sm font-medium border";

  // 타입별 rounded 조정
  const roundedClass =
    type === "state"
      ? "rounded-full" // state 칩은 완전 둥글게
      : type === "time"
        ? "rounded-xl" // time 칩은 약간 둥글게
        : "rounded-md"; // default 칩은 살짝 둥글게

  // 동적 스타일 - 배경색
  const bgClass =
    bgColor === "yellow" ? "bg-yellow-primary" : bgColor === "black" ? "bg-black" : "bg-white"; // 기본값 white

  // 동적 스타일 - 텍스트 색
  const textClass =
    textColor === "white"
      ? "text-white"
      : textColor === "yellow"
        ? "text-yellow-primary"
        : "text-black"; // 기본값 black

  // 그림자 여부
  const shadowClass = shadow ? "shadow-xl" : "";

  // 선택된 상태 스타일

  return (
    <div className={`${baseClass} ${roundedClass} ${bgClass} ${textClass} ${shadowClass}`}>
      {children}
    </div>
  );
}
