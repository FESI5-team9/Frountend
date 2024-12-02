import { getFilledStyle, getOutlinedStyle, getSizeClasses } from "./buttonStyles";

const Button = ({
  type = "button",
  color,
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
      className={`rounded-xl font-semibold ${color && (isFilled ? getFilledStyle(color, disabled) : getOutlinedStyle(color, disabled))} ${getSizeClasses(size)} ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
