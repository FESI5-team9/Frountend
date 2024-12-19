import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string | number | undefined;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // 사용자 정의 클래스
  readonly?: boolean; // 불리언 타입
}

export function Input(props: InputFieldProps) {
  const { value, name, onChange, className = "", readonly = false, ...rest } = props;
  return (
    <input
      value={value}
      name={name}
      readOnly={readonly} // 동적으로 적용
      onChange={onChange}
      className={`rounded-lg border border-gray-100 bg-gray-100 px-2 py-2 ${className} focus:border-yellow-400 focus:outline-none`}
      {...rest} // 추가 속성 처리
    />
  );
}
