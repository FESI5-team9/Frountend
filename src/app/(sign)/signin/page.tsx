"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signin } from "@/apis/authApi";
import Input from "@/components/Input/Input";
import Popup from "@/components/Popup";
import baseSchema from "@/utils/schema";
import Button from "../../../components/Button/Button";

type LoginFormData = z.infer<typeof baseSchema>;
const loginSchema = baseSchema.pick({ email: true, password: true });

function Login() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signin(data);
      router.push("/");
    } catch (error) {
      setIsPopupOpen(true);
    }
  };
  return (
    <div className="flex h-[540px] w-full flex-col items-center justify-center gap-8 rounded-3xl bg-white px-4 tablet:h-[556px] tablet:px-[54px] desktop:h-[612px] desktop:w-[510px] desktop:px-[54px]">
      <h1 className="text-xl">로그인 </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex w-full flex-col gap-[28px]">
        <Input
          register={register("email")}
          type="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          error={errors.email}
        />
        <Input
          register={register("password")}
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          error={errors.password}
        />
        {isValid ? (
          <Button bgColor="yellow">로그인하기</Button>
        ) : (
          <Button bgColor="disabled" size="small">
            로그인하기
          </Button>
        )}

        <div className="-mt-1 text-center">
          회원이 아니신가요?{" "}
          <Link href="/signup" scroll>
            <span className="text-blue-500 underline">회원가입</span>
          </Link>
        </div>
      </form>
      <div className="flex w-full items-center justify-between text-center text-gray-500">
        <hr className="w-[50px] border-gray-300 tablet:w-[180px] desktop:w-20" />
        <span className="text-md tablet:w-[240px] tablet:text-xl">SNS 계정으로 로그인하기</span>
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
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className="flex h-[140px] flex-col justify-between">
          <Image
            src="/icons/X.svg"
            width={24}
            height={24}
            className="self-end"
            onClick={() => setIsPopupOpen(false)}
            alt="닫기"
          />
          <p className="bold mt-2 text-center text-gray-700">아이디 혹은 비밀번호를 확인해주세요</p>
          <div className="w-[120px] self-end">
            <Button onClick={() => setIsPopupOpen(false)} size="small" bgColor="yellow">
              확인
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default Login;
