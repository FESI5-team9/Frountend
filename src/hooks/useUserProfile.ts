import { useEffect, useState } from "react";
import { getUserProfile } from "@/apis/authApi";
import { User } from "@/types/api/authApi";

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUserProfile(data);
      } catch (err) {
        setError("프로필을 불러오는 데 실패했습니다.");
      }
    };

    fetchUserProfile();
  }, []);

  return { userProfile, error };
};
