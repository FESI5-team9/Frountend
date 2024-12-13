import React from "react";
import { HeartProps } from "@/types/components/heart";

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
