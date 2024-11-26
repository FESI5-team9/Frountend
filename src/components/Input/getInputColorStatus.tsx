import { FieldError } from "react-hook-form";

const getInputColorStatus = (error: FieldError | undefined, touched: boolean | undefined) => {
  if (error) {
    return "border border-red-500";
  }
  if (touched) {
    return "border border-blue-500";
  }
  return "";
};

export default getInputColorStatus;
