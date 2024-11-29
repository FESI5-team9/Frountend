import Link from "next/link";
import { ButtonProps } from "@/types/components/button";
import { getSizeClasses, getVariantClasses } from "./buttonStyles";

const LinkButton = ({
  variant = "primary",
  size = "large",
  disabled = false,
  children = "click!!",
  className = "",
  href,
}: ButtonProps & { href: string }) => {
  return (
    <Link href={href}>
      <button
        disabled={disabled}
        className={`rounded-xl font-semibold ${getVariantClasses(variant, disabled)} ${getSizeClasses(size)} ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
