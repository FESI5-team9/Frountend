import { ButtonProps } from "@/types/components/button";
import React from "react";
import { getSizeClasses, getVariantClasses } from "@/components/Button/buttonStyles";

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
