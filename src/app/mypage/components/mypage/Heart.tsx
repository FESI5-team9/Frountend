import React from "react";

interface HeartProps {
  filled: boolean; // 하트가 채워졌는지 여부
  size?: number; // 하트 크기
  color?: string; // 채워진 하트 색상
  emptyColor?: string; // 빈 하트 색상
}

const Heart = ({ filled, size = 20, color = "#FFD700", emptyColor = "#E0E0E0" }: HeartProps) => {
  return (
    <span
      style={{
        color: filled ? color : emptyColor,
        fontSize: `${size}px`,
        margin: "0 2px",
      }}
    >
      ♥
    </span>
  );
};

export default Heart;