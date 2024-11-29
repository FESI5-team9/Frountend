import { getSizeClasses, getVariantClasses } from "@/components/Button/buttonStyles";
import { ButtonProps } from "@/types/components/button";

const Button = ({
  type = "button",
  variant = "primary",
  size = "large",
  onClick,
  disabled = false,
  children = "click!!",
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl font-semibold ${getVariantClasses(variant, disabled)} ${getSizeClasses(size)} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
