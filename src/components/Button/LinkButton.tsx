import Link from "next/link";
import { getFilledStyle, getOutlinedStyle, getSizeClasses } from "./buttonStyles";

const LinkButton = ({
  bgColor,
  size = "large",
  isFilled = true,
  disabled = false,
  children,
  className = "",
  href,
}: ButtonProps & { href: string }) => {
  return (
    <Link href={href}>
      <button
        disabled={disabled}
        className={`rounded-xl font-semibold ${bgColor && (isFilled ? getFilledStyle(bgColor, disabled) : getOutlinedStyle(bgColor, disabled))} ${getSizeClasses(size)} ${className} `}
      >
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
