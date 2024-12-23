import React, { useState } from "react";
import Heart from "@/app/mypage/components/Heart";

type SelectRatingProps = {
  onChange: (score: number) => void; // 선택된 점수를 부모로 전달
};

const SelectRating = ({ onChange }: SelectRatingProps) => {
  const [hovered, setHovered] = useState<number | null>(null); // 마우스 오버 상태
  const [selected, setSelected] = useState<number | null>(null); // 선택된 점수

  const handleMouseEnter = (index: number) => {
    setHovered(index); // 마우스 오버된 하트의 인덱스 저장
  };

  const handleMouseLeave = () => {
    setHovered(null); // 마우스 오버 상태 초기화
  };

  const handleClick = (index: number) => {
    setSelected(index); // 선택된 점수 저장
    onChange(index); // 부모로 점수 전달
  };

  return (
    <div className="flex h-6 w-full gap-0.5">
      {[1, 2, 3, 4, 5].map(index => (
        <span
          key={index}
          onMouseEnter={() => handleMouseEnter(index)} // 마우스 오버
          onMouseLeave={handleMouseLeave} // 마우스 아웃
          onClick={() => handleClick(index)} // 클릭
          className="flex cursor-pointer items-center justify-center"
        >
          <Heart
            size={24}
            filled={hovered !== null ? index <= hovered : index <= (selected || 0)} // hovered 우선 적용
          />
        </span>
      ))}
    </div>
  );
};

export default SelectRating;
