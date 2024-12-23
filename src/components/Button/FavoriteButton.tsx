"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { deleteFavoriteGathering, getFavoriteGathering } from "@/apis/favoriteGatheringApi";
import useUserStore from "@/store/userStore";

export default function FavoriteButton({ gatheringId, initialFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialFavorite);

  const router = useRouter();
  const userInfo = useUserStore();

  const submitFavorite = useCallback(async () => {
    if (!userInfo.id) return router.push("/signin");

    try {
      if (isFavorite) {
        await deleteFavoriteGathering(gatheringId);
      } else {
        await getFavoriteGathering(gatheringId);
      }
      setIsFavorite(prev => !prev);
    } catch (error) {
      console.error("Error updating favorite status", error);
    }
  }, [isFavorite, gatheringId, userInfo.id, router]);

  return (
    <>
      <motion.button
        onClick={submitFavorite}
        className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full outline-none ${isFavorite || "border-2 border-[#E5E7EB] bg-white"}`}
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }} // 클릭 시 약간의 축소 효과
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0, backgroundColor: isFavorite ? "#FFFACD" : "#FFFFFF" }}
          animate={{
            opacity: isFavorite ? 0.3 : 0,
            backgroundColor: isFavorite ? "#FFFACD" : "#FFFFFF",
          }}
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
    </>
  );
}
