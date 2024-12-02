"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function mypage() {
  // 탭 관리
  const [activeTab, setActiveTab] = useState("reviews");

  // 렌더링할 콘텐츠
  const renderContent = () => {
    switch (activeTab) {
      case "reviews":
        return "나의 리뷰";
      case "gathering":
        return "나의 모임";
      case "createdGathering":
        return "내가 만든 모임";
      default:
        return "신청한 모임이 아직 없어요";
    }
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex w-[343px] flex-col justify-center gap-4">
          <div className="w-full pt-6">
            <h1 className="text-[18px] font-semibold">마이 페이지</h1>
          </div>
          <div className="h-[178px] w-full rounded-3xl border-[2px] border-gray-300 bg-white">
            <div className="relative">
              <span className="absolute left-[23px] top-[53px] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white">
                <Image
                  src="/images/profile.svg"
                  width={56}
                  height={56}
                  alt="프로필 이미지"
                  className=""
                />
                <button className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                  <Image src="/images/modify.svg" width={18} height={18} alt="프로필 이미지 수정" />
                </button>
              </span>
            </div>
            <div className="flex h-[65px] justify-between rounded-t-3xl bg-yellow-primary px-[25px] py-4 text-base text-gray-900">
              <span className="flex items-center text-lg font-semibold text-gray-900">
                내 프로필
              </span>
              <button>
                <Image src="/images/modify.svg" width={32} height={32} alt="프로필 정보 수정하기" />
              </button>
            </div>
            <div className="mt-[15px] flex flex-col gap-[9px] pl-[92px] text-sm text-gray-800">
              <span className="text-base font-semibold leading-normal">닉네임</span>{" "}
              {/*api 연동 필요*/}
              <span className="flex gap-1.5">
                <p>E-mail :</p> <p className="text-gray-700">codeit@codeit.com</p>{" "}
                {/*api 연동 필요*/}
              </span>
            </div>
          </div>
          <div className="border-t-2 border-black bg-white">
            <div className="h-[494px] w-full">
              <div className="mx-auto mt-6 flex h-[34px] gap-3 pl-4">
                <button
                  onClick={() => setActiveTab("reviews")}
                  className="text-lg font-semibold text-[#9CA3AF] hover:border-b-2 hover:border-black hover:text-gray-900"
                >
                  나의 리뷰
                </button>
                <button
                  onClick={() => setActiveTab("gathering")}
                  className="text-lg font-semibold text-[#9CA3AF] hover:border-b-2 hover:border-black hover:text-gray-900"
                >
                  나의 모임
                </button>
                <button
                  onClick={() => setActiveTab("createGathering")}
                  className="text-lg font-semibold text-[#9CA3AF] hover:border-b-2 hover:border-black hover:text-gray-900"
                >
                  내가 만든 모임
                </button>
              </div>
              <div className="mt-[208px] text-center text-sm font-medium text-gray-500">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
