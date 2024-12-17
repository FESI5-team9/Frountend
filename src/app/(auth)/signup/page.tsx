"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { checkEmail, checkNickName, signup } from "@/apis/authApi";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Popup from "@/components/Popup";
import baseSchema from "@/utils/schema";

function Signup() {
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [nicknameVerified, setNicknameVerified] = useState<boolean | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<string | null>(null);
  type LoginFormData = z.infer<typeof baseSchema>;
  const loginSchema = baseSchema
    .pick({
      email: true,
      password: true,
      nickname: true,
      confirmPassword: true,
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    })
    .superRefine((data, ctx) => {
      if (data.email && emailVerified === false) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "사용할 수 없는 이메일입니다.",
          path: ["email"],
        });
      } else if (data.email && emailVerified === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "이메일 중복 확인이 필요합니다.",
          path: ["email"],
        });
      }

      if (data.nickname && nicknameVerified === false) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "동일한 닉네임이 존재합니다.",
          path: ["nickname"],
        });
      } else if (data.nickname && nicknameVerified === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "닉네임 중복 확인이 필요합니다.",
          path: ["nickname"],
        });
      }
      return true;
    });

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
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
        <Button
          onClick={() => setIsPopupOpen(null)}
          size="small"
          bgColor="yellow"
          className="w-full"
        >
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
      setIsPopupOpen("signup-failed");
    }
  };

  useEffect(() => {
    if (emailVerified !== null) {
      trigger("email");
    }
  }, [emailVerified, trigger]);

  // nicknameVerified가 변경되었을 때 유효성 검사 트리거
  useEffect(() => {
    if (nicknameVerified !== null) {
      trigger("nickname");
    }
  }, [nicknameVerified, trigger]);

  const onCheckEmail = async () => {
    const email = getValues("email");
    const { message } = await checkEmail(email);

    if (message === "true") {
      setEmailVerified(false);
      setIsPopupOpen("email-exists");
    } else {
      setEmailVerified(true);
      setIsPopupOpen("email-ok");
    }
  };

  const onCheckNickname = async () => {
    const nickname = getValues("nickname");
    const { message } = await checkNickName(nickname);

    if (message === "true") {
      setNicknameVerified(false);
      setIsPopupOpen("nickname-exists");
    } else {
      setNicknameVerified(true);
      setIsPopupOpen("nickname-ok");
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-3xl bg-white px-4 py-8 tablet:px-[54px] desktop:w-[510px] desktop:px-[54px]">
      <h1 className="text-xl">회원가입 </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex w-full flex-col gap-[28px]">
        <div className="relative flex w-full gap-3">
          <div className="flex-1">
            <Input
              register={register("nickname")}
              type="text"
              name="nickname"
              label="닉네임"
              placeholder="닉네임을 입력해주세요"
              error={errors.nickname}
            />
          </div>
          <Button
            type="button"
            onClick={onCheckNickname}
            className="mt-7"
            size="small"
            bgColor="yellow"
          >
            중복 확인
          </Button>
        </div>
        <div className="relative flex w-full gap-3">
          <div className="flex-1">
            <Input
              register={register("email")}
              type="email"
              name="email"
              label="이메일"
              placeholder="이메일을 입력해주세요"
              error={errors.email}
            />
          </div>
          <Button
            type="button"
            onClick={onCheckEmail}
            className="mt-7"
            size="small"
            bgColor="yellow"
          >
            중복 확인
          </Button>
        </div>
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

      <Popup
        id="nickname-ok"
        isOpen={isPopupOpen === "nickname-ok"}
        onClose={() => setIsPopupOpen(null)}
      >
        <PopupContent message="사용 가능한 닉네임 입니다." />
      </Popup>

      <Popup id="email-ok" isOpen={isPopupOpen === "email-ok"} onClose={() => setIsPopupOpen(null)}>
        <PopupContent message="사용 가능한 이메일입니다." />
      </Popup>
    </div>
  );
}

export default Signup;
