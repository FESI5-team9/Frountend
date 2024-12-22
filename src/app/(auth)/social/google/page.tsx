"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { socialSignup } from "@/apis/authApi";

function GoogleRedirect() {
  const router = useRouter();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      if (code) {
        await socialSignup("google", code);
        await router.push("/");
      }
    };

    handleGoogleLogin();
  }, [router]);

  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center">
      <Image
        src="/images/google.png"
        width={400}
        height={400}
        alt="구글 로고"
        className="animate-[spin_2s_linear_infinite]"
      />
      <p className="text-[40px]">구글 로그인 중...</p>
    </div>
  );
}

export default GoogleRedirect;
