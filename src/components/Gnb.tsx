"use client";

import Link from "next/link";

export default function Gnb() {
  // const { isLoggedIn } = useUserStore(); // zustand 설정 시 활성화

  return (
    <>
      <div className="fixed top-0 flex h-[56px] w-full items-center justify-between bg-orange-500 px-[16px] text-[14px] text-black tablet:px-[24px] desktop:px-[360px]">
        <div className="flex gap-[12px] tablet:gap-[20px] tablet:text-[16px]">
          <Link href={"/"} className="font-[800]">
            MNM
          </Link>
          <div className="flex items-center gap-[12px] text-sm font-semibold tablet:gap-[24px] tablet:text-[16px]">
            <Link href={""} className="hover:text-white" aria-label="모임 찾기">
              모임 찾기
            </Link>
            <Link href={""} className="hover:text-white" aria-label="찜한 모임">
              찜한 모임
            </Link>
            <Link href={""} className="hover:text-white" aria-label="모든 리뷰">
              모든 리뷰
            </Link>
          </div>
        </div>
        {/*유저 정보 받아오게 되면 할성화*/}
        {/* {isLoggedIn ? (
          // 로그인 상태면 유저 프로필
          <button aria-label="유저 프로필">유저 프로필</button> // 드롭 다운 추가 필요
        ) : (
          // 비로그인 상태면 로그인 링크
          <Link
            href={"/signin"}
            className="text-[14px] font-semibold hover:text-white tablet:text-[16px]"
            aria-label="로그인"
          >
            로그인
          </Link>
        )} */}
        <Link
          href={"/signin"}
          className="text-[14px] font-semibold hover:text-white tablet:text-[16px]"
          aria-label="로그인"
        >
          로그인
        </Link>
      </div>
    </>
  );
}
