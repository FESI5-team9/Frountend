// 버튼 색상 (기본 값: 하얀 버튼)
export const getVariantClasses = (variant: string, disabled: boolean) => {
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
    default:
      return "";
  }
};

// 버튼 크기 (기본 값: small)
export const getSizeClasses = (size: string) => {
  switch (size) {
    case "small":
      return "w-full h-[40px] text-sm";
    case "large":
      return "w-full h-[44px] text-base";
    default:
      return "";
  }
};
