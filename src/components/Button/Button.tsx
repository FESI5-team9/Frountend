import { getFilledStyle, getOutlinedStyle, getSizeClasses } from "./buttonStyles";

const Button = ({
  type = "button",
  bgColor,
  size = "large",
  isFilled = true,
  onClick,
  disabled = false,
  children,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl font-semibold ${bgColor && (isFilled ? getFilledStyle(bgColor, disabled) : getOutlinedStyle(bgColor, disabled))} ${getSizeClasses(size)} ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
