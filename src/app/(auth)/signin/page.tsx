"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getUserProfile, signin } from "@/apis/authApi";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Popup from "@/components/Popup";
import useUserStore from "@/store/userStore";
import { Login } from "@/types/api/authApi";
import baseSchema from "@/utils/schema";

type LoginFormData = z.infer<typeof baseSchema>;
const loginSchema = baseSchema.pick({ email: true, password: true });

function LoginPage() {
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

  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDRICT_URL}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDRICT_URL}&response_type=code`;
    window.location.href = GOOGLE_AUTH_URL;
  };

  const onSubmit = async (data: Login) => {
    const response = await signin(data);
    const { id, email, nickname, image } = await getUserProfile();

    const userStore = useUserStore.getState();
    userStore.setUser({
      id,
      email,
      nickname,
      image,
    });
    if (response.ok) {
      router.push("/");
    } else {
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
        <Button type={isValid ? "submit" : "button"} bgColor={isValid ? "yellow" : "disabled"}>
          로그인하기
        </Button>

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
        <button
          onClick={handleGoogleLogin}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300"
        >
          <Image
            src="/icons/Ic-Google.svg"
            width={48}
            height={48}
            alt="Google 아이콘"
            draggable={false}
          />
        </button>

        <button
          onClick={handleKakaoLogin}
          className="flex h-12 w-12 items-center justify-center rounded-full"
        >
          <Image
            src="/icons/Ic-Kakao.svg"
            width={48}
            height={48}
            alt="카카오톡 아이콘"
            draggable={false}
          />
        </button>
      </div>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className="flex h-[156px] w-[252px] flex-col items-center justify-between tablet:h-[162px] tablet:w-[402px]">
          <Image
            src="/icons/X.svg"
            width={24}
            height={24}
            className="self-end"
            onClick={() => setIsPopupOpen(false)}
            alt="닫기"
          />
          <p className="bold mt-2 text-center text-gray-700">아이디 혹은 비밀번호를 확인해주세요</p>
          <div className="w-[120px] tablet:self-end">
            <Button onClick={() => setIsPopupOpen(false)} size="small" bgColor="yellow">
              확인
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default LoginPage;
