export const getFilledStyle = (color: string, disabled?: boolean) => {
  if (disabled) return "bg-gray-400 text-white cursor-not-allowed";
  switch (color) {
    case "yellow":
      return "bg-yellow-primary text-gray-800";
    case "orange":
      return "bg-orange-primary text-white";
    case "red":
      return "bg-red-primary text-white";
    case "disabled":
      return "bg-gray-400 text-white";
  }
};

export const getOutlinedStyle = (color: string, disabled?: boolean) => {
  if (disabled) return "bg-white text-gray-400 border border-gray-400 cursor-not-allowed";
  switch (color) {
    case "yellow":
      return "bg-white text-yellow-primary border border-yellow-primary";
    case "orange":
      return "bg-white text-orange-primary border border-orange-primary";
    case "red":
      return "bg-white text-red-primary border border-red-primary";
    case "disabled":
      return "bg-white text-gray-400 border border-gray-400 cursor-not-allowed";
  }
};

export const getSizeClasses = (size: string) => {
  switch (size) {
    case "small":
      return "h-10 px-4 text-sm w-full";
    case "large":
      return "h-12 px-6 text-base w-full";
  }
};
