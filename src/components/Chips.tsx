import { ChipProps } from "@/types/components/chip";

export default function Chip({
  type,
  bgColor = "bg-yellow-500", // Tailwind CSS 클래스 직접 사용
  textColor = "text-black",
  shadow = false,
  fontSize = "text-sm", // 기본 폰트 사이즈
  fontWeight = "font-medium", // 기본 폰트 굵기
  className,
  children,
}: ChipProps) {
  // 기본 스타일
  const baseClass = "flex items-center justify-center px-2 py-1 border border-none";

  // 타입별 rounded 조정
  const roundedClass =
    type === "state"
      ? "rounded-full" // state 칩은 완전 둥글게
      : type === "time"
        ? "rounded-xl" // time 칩은 약간 둥글게
        : "rounded-md"; // default 칩은 살짝 둥글게

  // 그림자 여부
  const shadowClass = shadow ? "shadow-xl" : "";

  return (
    <div
      className={`${baseClass} ${roundedClass} ${bgColor} ${textColor} ${shadowClass} ${fontSize} ${fontWeight} ${className}`}
    >
      {children}
    </div>
  );
}
