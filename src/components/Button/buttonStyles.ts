export const getFilledStyle = (color: string, disabled?: boolean) => {
  if (disabled) return "bg-gray-400 text-white cursor-not-allowed";

  switch (color) {
    case "yellow":
      return "bg-yellow-primary text-gray-800 hover:bg-[#FFDB38]";
    case "orange":
      return "bg-orange-primary text-white hover:bg-[#F28B35]";
    case "red":
      return "bg-red-primary text-white hover:bg-[#FF4122]";
    case "disabled":
      return "bg-gray-400 text-white cursor-not-allowed";
  }
};
export const getOutlinedStyle = (color: string, disabled?: boolean) => {
  if (disabled) return "bg-white text-gray-400 border border-gray-400 cursor-not-allowed";

  switch (color) {
    case "yellow":
      return "bg-white text-yellow-primary border border-yellow-primary hover:bg-yellow-100";
    case "orange":
      return "bg-white text-orange-primary border border-orange-primary hover:bg-orange-100";
    case "red":
      return "bg-white text-red-primary border border-red-primary hover:bg-red-100";
    case "disabled":
      return "bg-white text-gray-400 border border-gray-400 cursor-not-allowed hover:bg-gray-100";
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
