"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGatherings } from "@/hooks/useGatherings";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useUserProfile } from "@/hooks/useUserProfile";
import { CreateGathering } from "@/app/mypage/utils/CreateGathering";
import { MyGathering } from "@/app/mypage/utils/MyGathering/MyGathering";

export default function Mypage() {
  const [activeTab, setActiveTab] = useState("reviews");
  const { userProfile, error: userProfileError } = useUserProfile();
  const { gatherings, loading, error } = useGatherings();
  const { handleImageUpload, error: uploadError } = useImageUpload(userProfile);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageEditClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (activeTab === "gathering" || activeTab === "createdGathering") {
      // Fetch gatherings logic
    } else if (activeTab === "reviews") {
      // Fetch reviews logic
    }
  }, [activeTab]);

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[343px] flex-col justify-center gap-5 tablet:w-[696px] desktop:w-[996px]">
        <div className="w-full pt-6">
          <h1 className="text-lg font-semibold tablet:text-2xl">마이 페이지</h1>
        </div>
        <div className="h-[178px] w-full rounded-3xl border-[2px] border-gray-300 bg-white tablet:h-[172px]">
          <div className="relative">
            <span className="absolute left-[23px] top-[53px] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white">
              <Image
                src={userProfile?.image || "/images/profile.svg"}
                width={56}
                height={56}
                alt="프로필 이미지"
                className="overflow-hidden rounded-full"
              />
              <button
                className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white"
                onClick={handleImageEditClick}
              ></button>
              <label
                htmlFor="profileImage"
                className="absolute bottom-1 right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white"
              >
                <Image src="/images/modify.svg" width={18} height={18} alt="프로필 이미지 수정" />
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {/* <button className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <Image src="/images/modify.svg" width={18} height={18} alt="프로필 이미지 수정" />
              </button> */}
            </span>
          </div>
          <div className="flex h-[65px] justify-between rounded-t-3xl bg-yellow-primary px-[25px] py-4 text-base text-gray-900">
            <span className="flex items-center text-lg font-semibold text-gray-900">내 프로필</span>
            <button>
              <Image src="/images/modify.svg" width={32} height={32} alt="프로필 정보 수정하기" />
            </button>
          </div>
          <div className="mt-[15px] flex flex-col gap-[9px] pl-[92px] text-sm text-gray-800">
            <span className="text-base font-semibold leading-normal">{userProfile?.nickname}</span>{" "}
            {/*api 연동 필요*/}
            <span className="flex gap-1.5">
              <p>E-mail :</p> <p className="text-gray-700">{userProfile?.email}</p>{" "}
              {/*api 연동 필요*/}
            </span>
          </div>
        </div>
        <div className="border-t-2 border-black bg-white">
          <div className="mx-auto mt-6 flex h-[34px] gap-3 pl-4">
            <button
              onClick={() => setActiveTab("reviews")}
              className={`text-lg font-semibold ${
                activeTab === "reviews" ? "border-b-2 border-black text-gray-900" : "text-[#9CA3AF]"
              }`}
            >
              나의 리뷰
            </button>
            <button
              onClick={() => setActiveTab("gathering")}
              className={`text-lg font-semibold ${
                activeTab === "gathering"
                  ? "border-b-2 border-black text-gray-900"
                  : "text-[#9CA3AF]"
              }`}
            >
              나의 모임
            </button>
            <button
              onClick={() => setActiveTab("createdGathering")}
              className={`text-lg font-semibold ${
                activeTab === "createdGathering"
                  ? "border-b-2 border-black text-gray-900"
                  : "text-[#9CA3AF]"
              }`}
            >
              내가 만든 모임
            </button>
          </div>
          <div className="px-6 py-6">
            {/* activeTab 값에 따라 각 컴포넌트 렌더링 */}
            {activeTab === "reviews" && <Reviews />}
            {activeTab === "gathering" && (
              <MyGathering gatherings={gatherings} loading={loading} error={error} />
            )}
            {activeTab === "createdGathering" && <CreateGathering />}
          </div>
        </div>
      </div>
    </div>
  );
}
