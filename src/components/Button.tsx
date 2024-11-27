import React from "react";

type ButtonProps = {
  text?: string;
  variant?: "primary" | "secondary" | "danger" | "success"; // 버튼 색상 4가지
  size?: "small" | "large"; // 버튼 크기 2가지
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  text = "생성하기",
  variant,
  size = "small",
  onClick,
  disabled = false,
  className,
}) => {
  // 버튼 색상(기본 값 : 하얀 버튼) case 색상 순서 = 피그마 생성하기 버튼 컴포넌트 순서
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-orange-600 text-white hover:orange-200";
      case "secondary":
        return "bg-orange-700 text-white hover:orange-200";
      case "danger":
        return "bg-orange-800 text-white hover:orange-200";
      case "success":
        return "bg-gray-400 text-white hover:orange-200";
      default:
        return "bg-white text-orange-600 outline outline-orange-600 hover:orange-200";
    }
  };

  // 버튼 크기(기본 값 : small)
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-[120px] h-[40px] text-sm";
      case "large":
        return "w-[332px] h-[44px] text-base";
      default:
        return "w-[120px] h-[40px] text-sm";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg font-semibold ${getVariantClasses()} ${getSizeClasses()} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
