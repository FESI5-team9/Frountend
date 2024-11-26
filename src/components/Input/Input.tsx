import Image from "next/image";
import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.PropsWithChildren {
  register: UseFormRegisterReturn;
  type: "text" | "email" | "password" | "number";
  name: string;
  label: string;
  placeholder: string;
  error: FieldError | undefined;
  touched: boolean | undefined;
  disabled?: boolean;
}

export default function Input({ register, type, name, label, placeholder, error }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const effectiveError = error;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold leading-5">
        {label}
      </label>
      <div className="flex items-center">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          className={`h-10 w-full rounded-xl bg-gray-50 py-[10px] pl-4 text-sm font-medium leading-5 outline-none ${
            type === "password" ? "pr-10" : "pr-4"
          } ${effectiveError ? "border-[2px] border-red-500" : ""}`}
        />
        {type === "password" && (
          <button className="absolute right-4 h-6 w-6" type="button" onClick={handleTogglePassword}>
            {showPassword ? (
              <Image
                width={24}
                height={24}
                src="/icons/visibility_on.svg"
                alt="비밀번호 숨김 아이콘"
              />
            ) : (
              <Image
                width={24}
                height={24}
                src="/icons/visibility_off.svg"
                alt="비밀번호 숨김 아이콘"
              />
            )}
          </button>
        )}
      </div>
      {effectiveError && (
        <p className="text-sm font-semibold leading-5 text-red-500">{effectiveError.message}</p>
      )}
    </div>
  );
}
