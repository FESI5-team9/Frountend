// useImageUpload.ts
import { useState } from "react";
import { updateUserProfile } from "@/apis/authApi";
import { User } from "@/types/api/gatheringApi";

export const useImageUpload = (userProfile: User | null) => {
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!userProfile) {
      try {
        const updatedUser = await updateUserProfile({ image: file });
        return updatedUser;
      } catch (err) {
        setError("프로필 이미지 업로드에 실패했습니다.");
      }
    } else {
      setError("업로드할 파일이 없습니다.");
    }
  };

  return { handleImageUpload, error };
};
