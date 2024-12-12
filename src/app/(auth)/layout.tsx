import Image from "next/image";
import Link from "next/link";
import Gnb from "@/components/Gnb";

function SignRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen w-full bg-gray-100">
      <Gnb />
      <div className="mx-auto flex h-full min-h-screen w-full flex-col items-center justify-center gap-12 px-4 py-10 pt-[88px] tablet:px-[75px] desktop:flex-row desktop:px-4">
        <div className="flex flex-col gap-7 text-center text-2xl font-bold">
          <p>
            나만 알고싶은 맛집
            <br />
            이제는 00에서 함께나눠요
          </p>
          <Link href="/" scroll>
            <Image
              src="/images/img_login.png"
              width={300}
              height={280}
              className="w-[290px] tablet:w-[410px] desktop:w-[300px]"
              alt="메인로고"
            />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
export default SignRootLayout;
