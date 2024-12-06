"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { APIError } from "@/apis/HttpClient/error";
import { signup } from "@/apis/authApi";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Popup from "@/components/Popup";
import baseSchema from "@/utils/schema";

type LoginFormData = z.infer<typeof baseSchema>;
const loginSchema = baseSchema
  .pick({
    email: true,
    password: true,
    nickname: true,
    name: true,
    confirmPassword: true,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

function Signup() {
  const [isPopupOpen, setIsPopupOpen] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });
  const router = useRouter();

  const PopupContent = ({ message }: { message: string }) => (
    <div className="flex h-[156px] w-[252px] flex-col items-center justify-between tablet:h-[162px] tablet:w-[402px]">
      <Image
        src="/icons/X.svg"
        width={24}
        height={24}
        className="self-end"
        onClick={() => setIsPopupOpen(null)}
        alt="닫기"
      />
      <p className="bold mt-2 text-center text-gray-700">{message}</p>
      <div className="w-[120px] tablet:self-end">
        <Button onClick={() => setIsPopupOpen(null)} size="small" bgColor="yellow">
          확인
        </Button>
      </div>
    </div>
  );

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signup(data);
      router.push("/");
    } catch (error) {
      if (error instanceof APIError) {
        const errorInfo = JSON.parse(error.message);
        const errorMessage = errorInfo.message.message;

        if (errorMessage === "중복된 이메일입니다") {
          setIsPopupOpen("email-exists");
        } else if (errorMessage === "중복된 닉네임입니다") {
          setIsPopupOpen("nickname-exists");
        } else {
          setIsPopupOpen("signup-failed");
        }
      }
    }
  };
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-3xl bg-white px-4 py-8 tablet:px-[54px] desktop:w-[510px] desktop:px-[54px]">
      <h1 className="text-xl">회원가입 </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex w-full flex-col gap-[28px]">
        <Input
          register={register("name")}
          type="text"
          name="name"
          label="이름"
          placeholder="이름을 입력해주세요"
          error={errors.name}
        />
        <Input
          register={register("email")}
          type="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          error={errors.email}
        />
        <Input
          register={register("nickname")}
          type="text"
          name="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          error={errors.nickname}
        />
        <Input
          register={register("password")}
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          error={errors.password}
        />
        <Input
          register={register("confirmPassword")}
          type="password"
          name="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          error={errors.confirmPassword}
        />
        <Button type={isValid ? "submit" : "button"} bgColor={isValid ? "yellow" : "disabled"}>
          회원가입하기
        </Button>
        <div className="-mt-1 text-center">
          이미 회원이신가요?{" "}
          <Link href="/signin" scroll>
            <span className="text-orange-300 underline">로그인</span>
          </Link>
        </div>
      </form>
      <div className="flex w-full items-center justify-between text-center text-gray-500">
        <hr className="w-[50px] border-gray-300 tablet:w-[180px] desktop:w-20" />
        <span className="text-md tablet:w-[240px] tablet:text-xl">SNS 계정으로 회원가입하기</span>
        <hr className="w-[50px] border-gray-300 tablet:w-[180px] desktop:w-20" />
      </div>
      <div className="flex justify-center gap-4">
        <Link
          href=""
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300"
        >
          <Image
            src="/icons/Ic-Google.svg"
            width={48}
            height={48}
            alt="Google 아이콘"
            draggable={false}
          />
        </Link>

        <Link href="" className="flex h-12 w-12 items-center justify-center rounded-full">
          <Image
            src="/icons/Ic-Kakao.svg"
            width={48}
            height={48}
            alt="카카오톡 아이콘"
            draggable={false}
          />
        </Link>
      </div>
      <Popup
        id="email-exists"
        isOpen={isPopupOpen === "email-exists"}
        onClose={() => setIsPopupOpen(null)}
      >
        <PopupContent message="이메일이 존재합니다." />
      </Popup>

      <Popup
        id="nickname-exists"
        isOpen={isPopupOpen === "nickname-exists"}
        onClose={() => setIsPopupOpen(null)}
      >
        <PopupContent message="닉네임이 이미 존재합니다." />
      </Popup>

      <Popup
        id="signup-failed"
        isOpen={isPopupOpen === "signup-failed"}
        onClose={() => setIsPopupOpen(null)}
      >
        <PopupContent message="회원가입에 실패했습니다." />
      </Popup>
    </div>
  );
}

export default Signup;
