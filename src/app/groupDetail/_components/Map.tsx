import Image from "next/image";
import KakaoMapLayout from "./KakaoMapLayout";

type MapProps = {
  address: string;
};

export default function Map({ address }: MapProps) {
  return (
    <div className="h-full w-full">
      <div className="h-[336px] w-full rounded-2xl bg-gray-500 tablet:h-[180px]">
        <KakaoMapLayout />
      </div>
      <div className="mt-2 flex items-center gap-1">
        <div className="flex size-[18px] items-center justify-center">
          <Image src="/images/detailPage/location.svg" alt="위치" width={12} height={16} />
        </div>
        <p className="text-sm font-medium text-[#3C3C3C]">{address}</p>
      </div>
    </div>
  );
}
