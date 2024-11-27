"use client";

// import Image from "next/image"; // 유저 정보 받아오기 가능할 때 활성화
import Link from "next/link";

export default function Gnb() {
  // const { isLoggedIn } = useUserStore(); // zustand 설정 시 활성화

  return (
    <>
      <div className="fixed top-0 flex h-[56px] w-full max-w-[1200px] items-center justify-between bg-orange-500 px-[16px] text-sm text-black tablet:h-[60px] tablet:px-[24px]">
        <div className="flex gap-[12px] tablet:gap-[20px] tablet:text-base">
          <Link href={"/"} className="font-[800]">
            MNM
          </Link>
          <div className="flex items-center gap-[12px] text-sm font-semibold tablet:gap-[24px] tablet:text-base">
            <Link href={"/"} className="hover:text-white" aria-label="모임 찾기">
              모임 찾기
            </Link>
            <Link
              href={"/myFavorite/gathering"}
              className="hover:text-white"
              aria-label="찜한 모임"
            >
              찜한 모임
            </Link>
            <Link href={"/reviews"} className="hover:text-white" aria-label="모든 리뷰">
              모든 리뷰
            </Link>
          </div>
        </div>

        {/* {isLoggedIn ? (
          // 로그인 상태면 유저 프로필
          <button className="" aria-label="유저 프로필">
            <Image src="/images/profile.svg" width={40} height={40} alt="프로필" />
          </button>
        ) : (
          // 비로그인 상태면 로그인 링크
          <Link
            href={"/signin"}
            className="text-sm font-semibold hover:text-white tablet:text-base"
            aria-label="로그인"
          >
            로그인
          </Link>
        )} */}

        <Link
          href={"/signin"}
          className="text-sm font-semibold hover:text-white tablet:text-base"
          aria-label="로그인"
        >
          로그인
        </Link>
      </div>
    </>
  );
}
