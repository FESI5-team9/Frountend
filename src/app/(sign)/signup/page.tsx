import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <div className="flex h-[832px] w-full flex-col items-center justify-center gap-8 rounded tablet:h-[860px] tablet:px-[113px] desktop:w-[510px] desktop:px-0">
      <div className="h-full w-full bg-red-500" />
      <div className="flex w-full items-center justify-between text-center text-gray-500">
        <hr className="w-[70px] border-gray-300 tablet:w-[160px]" />
        <span className="text-md tablet:w-[240px] tablet:text-xl">SNS 계정으로 회원가입하기</span>
        <hr className="w-[70px] border-gray-300 tablet:w-[160px]" />
      </div>
      <div className="flex justify-center gap-4">
        <Link
          href=""
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300"
        >
          <Image
            src="/icons/Ic-Google.svg"
            width={48}
            height={48}
            alt="Google 아이콘"
            draggable={false}
          />
        </Link>

        <Link href="" className="flex h-12 w-12 items-center justify-center rounded-full">
          <Image
            src="/icons/Ic-Kakao.svg"
            width={48}
            height={48}
            alt="카카오톡 아이콘"
            draggable={false}
          />
        </Link>
      </div>
    </div>
  );
}

export default page;
