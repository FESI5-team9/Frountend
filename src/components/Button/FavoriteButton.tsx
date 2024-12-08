import { useEffect, useState } from "react";
import Image from "next/image";

export default function FavoriteButton({ gatheringId }: FavoriteButtonProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoritesinLocalStorage = localStorage.getItem("favorites");
    const parsedfavorites = favoritesinLocalStorage ? JSON.parse(favoritesinLocalStorage) : [];
    setFavorites(parsedfavorites);
    setIsFavorite(parsedfavorites.includes(gatheringId));
  }, [gatheringId]);

  const setFavoriteButton = () => {
    const updatedFavorites = isFavorite
      ? favorites.filter(id => id !== gatheringId)
      : [...favorites, gatheringId];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    setIsFavorite(prev => !prev);
  };

  return (
    <button onClick={setFavoriteButton}>
      {gatheringId && isFavorite ? (
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
