import React from "react";

// 타입을 객체로 관리
const variantOptions = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  whitePrimary: "whitePrimary",
  whiteSecondary: "whiteSecondary",
  whiteTertiary: "whiteTertiary",
  disabled: "disabled",
} as const;

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  text?: string;
  variant?: keyof typeof variantOptions;
  size?: "small" | "large"; // 버튼 크기 2가지(sm: 40px, lg: 44px, height 기준)
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  type = "button", // 기본 타입 : button
  text = "button",
  variant = "primary",
  size = "large",
  onClick,
  disabled,
  className,
}) => {
  // 버튼 색상(기본 값 : 하얀 버튼) case 색상 순서 = 피그마 생성하기 버튼 컴포넌트 순서
  const getVariantClasses = () => {
    if (disabled) return "bg-gray-400 text-white cursor-not-allowed";

    switch (variant) {
      case "primary":
        return "bg-orange-600 text-white hover:opacity-50";
      case "secondary":
        return "bg-orange-700 text-white hover:opacity-50";
      case "tertiary":
        return "bg-orange-800 text-white hover:opacity-50";
      case "whitePrimary":
        return `bg-white text-orange-600 outline outline-orange-600`;
      case "whiteSecondary":
        return `bg-white text-orange-700 outline outline-orange-700`;
      case "whiteTertiary":
        return `bg-white text-orange-800 outline outline-orange-800`;
      case "disabled":
        return "bg-white text-gray-400 outline outline-gray-400";
    }
  };

  // 버튼 크기(기본 값 : small)
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-full h-[40px] text-sm";
      case "large":
        return "w-full h-[44px] text-base";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg font-semibold ${getVariantClasses()} ${getSizeClasses()} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
