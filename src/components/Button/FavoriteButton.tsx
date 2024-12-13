"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { deleteFavoriteGathering, getFavoriteGathering } from "@/apis/favoriteGatheringApi";

// import useUserStore from "@/store/userStore";

export default function FavoriteButton({ gatheringId, initialFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialFavorite);
  // const userInfo = useUserStore();

  const submitFavorite = async () => {
    // if (!userInfo.id) return alert("로그인하세요");
    // console.log(userInfo);
    if (isFavorite) {
      // api 찜하기 취소 요청
      await deleteFavoriteGathering(gatheringId);
      // const result = await deleteFavoriteGathering(gatheringId);
      setIsFavorite(false);
      // console.log(result);
    } else {
      // api 찜하기 요청
      await getFavoriteGathering(gatheringId);
      // const result = await getFavoriteGathering(gatheringId);
      setIsFavorite(true);
      // console.log(result);
    }
  };

  return (
    <motion.button
      onClick={submitFavorite}
      className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full outline-none ${isFavorite || "border-2 border-[#E5E7EB] bg-white"}`}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.9 }} // 클릭 시 약간의 축소 효과
    >
      <motion.div
        className={`absolute inset-0 rounded-full ${isFavorite ? "bg-[#FFFACD]" : "bg-white"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isFavorite ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.img
        src={isFavorite ? "/images/heart/filled_heart.svg" : "/images/heart/empty_heart.svg"}
        alt="like"
        className="relative z-10 h-6 w-6"
        key={isFavorite ? "filled-heart" : "empty-heart"}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
