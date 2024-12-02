export const variantOptions = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  whitePrimary: "whitePrimary",
  whiteSecondary: "whiteSecondary",
  whiteTertiary: "whiteTertiary",
  disabled: "disabled",
} as const;

export type Variant = keyof typeof variantOptions;

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  size?: "small" | "large";
  onClick?: () => void;
  disabled?: boolean;
  children?: string;
  className?: string;
};

export type FavoriteButtonProps = {
  gatheringId: number;
};
