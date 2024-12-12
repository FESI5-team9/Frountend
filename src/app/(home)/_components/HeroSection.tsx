import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="mb-10 flex flex-row items-center gap-4 px-2 tablet:px-0">
      <Image
        src="/images/mainPage/head.svg"
        width={72}
        height={72}
        alt="head"
        priority
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,..."
      />
      <div>
        <h4 className="pb-2 text-sm">함께 힐 사람이 없나요?</h4>
        <h1 className="text-2xl">지금 모임에 참여해보세요</h1>
      </div>
    </div>
  );
}
