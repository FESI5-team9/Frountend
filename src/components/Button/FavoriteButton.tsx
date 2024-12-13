import { useState } from "react";
import Image from "next/image";
import { deleteFavoriteGathering, getFavoriteGathering } from "@/apis/favoriteGatheringApi";
import useUserStore from "@/store/userStore";

export default function FavoriteButton({ gatheringId, initialFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialFavorite);
  const userInfo = useUserStore();

  const submitFavorite = async () => {
    if (!userInfo.id) return alert("로그인하세요");
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
    <button onClick={submitFavorite}>
      {isFavorite ? (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFFACD]">
          <Image src="/images/heart/filled_heart.svg" width={24} height={24} alt="unlike" />
        </div>
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#E5E7EB] bg-white hover:opacity-50">
          <Image src="/images/heart/empty_heart.svg" width={24} height={24} alt="like" />
        </div>
      )}
    </button>
  );
}
