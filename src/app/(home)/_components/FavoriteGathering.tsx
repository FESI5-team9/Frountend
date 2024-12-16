"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { deleteFavoriteGathering, getFavoriteGathering } from "@/apis/favoriteGatheringApi";

export default function FavoriteGathering({ id, favorite }: { id: number; favorite: boolean }) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  function checkLoggedIn() {
    if (typeof document === "undefined") return false; // 서버 환경 방지
    const cookies = document.cookie.split("; ");
    return cookies.some(cookie => cookie.startsWith("accessToken=")); // "token" 쿠키가 있으면 로그인 상태
  }

  const handleToggleFavorite = async () => {
    try {
      const isLoggedIn = checkLoggedIn(); // 로그인 여부 확인 함수 호출
      if (isLoggedIn) {
        // 로그인된 경우 서버 요청 처리
        if (isFavorite) {
          deleteFavoriteGathering(id);
        } else {
          getFavoriteGathering(id);
        }
      } else {
        // 로그인 안 된 경우 로컬스토리지 처리
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "{}");
        //배열을 쓰면 find,include를 써야해서 로직이 느려진다고 합니다.-> 객체 사용
        if (isFavorite) {
          delete storedFavorites[id]; // 로컬스토리지에서 제거
          alert("로컬 찜 취소");
        } else {
          storedFavorites[id] = true; // 로컬스토리지에 추가
          alert("로컬 찜 완료");
        }
        localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      }

      // 상태 업데이트
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("찜하기 작업 중 에러 발생:", error);
    }
  };

  return (
    <motion.button
      onClick={handleToggleFavorite}
      className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white"
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.9 }} // 클릭 시 약간의 축소 효과
    >
      <motion.div
        className={`absolute inset-0 rounded-full ${isFavorite ? "bg-red-500" : "bg-transparent"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isFavorite ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.img
        src={isFavorite ? "/images/heart/red_heart.svg" : "/images/mainPage/heart.svg"}
        alt="like"
        className="relative z-10 h-6 w-6"
        key={isFavorite ? "red-heart" : "empty-heart"}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
