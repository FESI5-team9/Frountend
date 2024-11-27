export type ChipType = "state" | "time" | "default"; // 칩 종류.

export interface ChipProps {
  type: ChipType; // 칩 종류 선택
  bgColor?: "white" | "black" | "yellow";
  textColor?: "white" | "black" | "yellow";
  shadow?: boolean; // 그림자 여부
  children: React.ReactNode; // 칩 내용
}
