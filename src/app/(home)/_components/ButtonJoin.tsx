"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";

export default function ButtonJoin({ id, participation }: { id: number; participation: boolean }) {
  const [isParticipation, setIsParticipation] = useState(participation);
  const { id: userId } = useUserStore();
  const router = useRouter();

  async function handleJoinGathering() {
    try {
      if (!userId) {
        router.push("/signin");
        return;
      }

      // 쿠키에서 accessToken 가져오기
      const cookies = document.cookie;
      const token = cookies
        .split("; ")
        .find(row => row.startsWith("accessToken="))
        ?.split("=")[1];

      // API 요청
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/gatherings/${id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        router.push("/signin");
      }

      alert("모임을 참여했습니다! 🎉");
      setIsParticipation(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다.";

      if (errorMessage === "이미 참여한 모임입니다.") {
        alert("이미 참여가 된 모임입니다.");
      } else {
        alert(errorMessage || "참여에 실패했습니다. 다시 시도해주세요.");
      }

      console.error("참여 실패:", errorMessage);
    }
  }

  return (
    <div>
      {isParticipation ? (
        <div className="flex h-[40px] w-[100px] items-center rounded-xl border bg-gray-400 px-5 text-base font-semibold text-gray-100">
          참여완료
        </div>
      ) : (
        <button
          onClick={() => handleJoinGathering()}
          className="h-[40px] w-[100px] rounded-xl border bg-yellow-primary text-black"
        >
          참여하기
        </button>
      )}
    </div>
  );
}
