export type ChipType = "state" | "time" | "default"; // 칩 종류.

export interface ChipProps {
  type: ChipType; // 칩 종류 선택
  bgColor?: string;
  textColor?: string;
  shadow?: boolean; // 그림자 여부
  fontSize?: string;
  fontWeight?: string; // 기본 폰트 굵기
  className?: string;
  children: React.ReactNode; // 칩 내용
}
