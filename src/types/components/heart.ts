export interface HeartProps {
  filled: boolean; // 하트가 채워졌는지 여부
  size: number; // 하트 크기
  color?: string; // 채워진 하트 색상
  emptyColor?: string; // 빈 하트 색상
}

export interface RatingProps {
  score: number;
}
