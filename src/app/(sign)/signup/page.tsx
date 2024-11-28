"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "@/components/Input/Input";
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

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = async (data: LoginFormData) => {
    // 나중에 회원가입 함수 넣으면 됨
    alert(data);
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
        <button
          className={`mt-4 h-10 w-full rounded-md ${
            isValid ? "bg-blue-600" : "bg-gray-600"
          } tablet:h-11`}
        >
          회원가입하기
        </button>
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
    </div>
  );
}

export default Login;
