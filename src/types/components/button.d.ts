interface ButtonProps {
  type?: "button" | "submit" | "reset";
  bgColor?: "yellow" | "orange" | "red" | "disabled";
  size?: "small" | "large";
  isFilled?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}
