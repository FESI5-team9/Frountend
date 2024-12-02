import Link from "next/link";
import { getFilledStyle, getOutlinedStyle, getSizeClasses } from "./buttonStyles";

const LinkButton = ({
  color,
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
        className={`rounded-xl font-semibold ${color && (isFilled ? getFilledStyle(color, disabled) : getOutlinedStyle(color, disabled))} ${getSizeClasses(size)} ${className} `}
      >
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
