import { FieldError } from "react-hook-form";

const getInputColorStatus = (error: FieldError | undefined) => {
  if (error) {
    return "border-[2px] border-red-500";
  }
  return "";
};

export default getInputColorStatus;
