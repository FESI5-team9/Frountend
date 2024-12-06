"use client";

import { useEffect, useState } from "react";

export default function useKakaoLoader() {
  const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAOJSKEY;
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    if (!kakaoAppKey) {
      console.error("Kakao API key is missing.");
      return;
    }

    // 이미 로드된 경우
    if (window.kakao?.maps) {
      // 타입 안전하게 확인
      setIsKakaoLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao?.maps) {
        // 타입 체크
        setIsKakaoLoaded(true);
      } else {
        console.error("Failed to load Kakao maps SDK.");
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [kakaoAppKey]);

  return isKakaoLoaded;
}
