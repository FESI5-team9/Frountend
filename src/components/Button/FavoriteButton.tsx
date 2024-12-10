import { useState } from "react";
import Image from "next/image";

export default function FavoriteButton({ gatheringId, initialFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialFavorite);

  const submitFavorite = () => {
    if (isFavorite) {
      // api 찜하기 취소 요청
      alert(gatheringId);
      setIsFavorite(false);
    } else {
      // api 찜하기 요청
      setIsFavorite(true);
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
