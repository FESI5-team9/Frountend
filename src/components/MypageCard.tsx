import Image from "next/image";
import Button from "@/components/Button/Button";
import Chip from "@/components/Chips";

type MypageCardProps = {
  name: string;
  location: string;
  address1: string;
  dateTime: string;
  keywords: string[];
  image: string;
  participantCount: number;
  capacity: number;
};

export default function MypageCard({
  name,
  location,
  address1,
  dateTime,
  image,
  participantCount,
  capacity,
}: MypageCardProps) {
  return (
    <div className="flex h-[352px] w-full flex-col gap-4 tablet:flex-row">
      <div className="relative flex h-[156px] w-full items-center justify-center overflow-hidden rounded-3xl tablet:w-[280px]">
        <Image src={image} fill objectFit="cover" alt="모임 이미지" />
      </div>
      <div className="flex flex-col">
        <div className="mb-3 flex gap-2">
          <Chip
            type="state"
            bgColor="bg-orange-100"
            textColor="text-orange-primary"
            className="flex items-center justify-center"
          >
            이용 예정
          </Chip>
          <Chip
            type="state"
            textColor="text-orange-primary"
            bgColor="bg-transparent"
            className="flex items-center justify-center outline outline-orange-100"
          >
            개설 예정
          </Chip>
        </div>
        <div className="flex gap-3">
          <div className="mb-[18px] flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-lg font-semibold">
              <span className="inline-block">{name}</span>
              <span className="inline-block">|</span>
              <span className="text-#3C3C3C inline-block text-sm">
                &nbsp;{`${location}${address1}`}
              </span>
            </span>
            <div className="flex items-center gap-3">
              <span className="text-#3C3C3C flex gap-3 text-sm">
                {new Date(dateTime).toLocaleString()}
              </span>
              <span className="flex gap-0.5">
                <Image
                  src="/icons/person.svg"
                  width={16}
                  height={16}
                  alt="참여 인원"
                  className="inline-block"
                />
                <span className="inline-block">{`${participantCount}/${capacity}`}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="w-[120px]">
          <Button
            size="small"
            isFilled
            className="border border-orange-primary px-0 text-[14px] text-orange-primary"
          >
            예약 취소하기
          </Button>
        </div>
      </div>
    </div>
  );
}

// export default function MypageCard() {
//   return (
//     <div className="flex h-[352px] w-full flex-col gap-4 tablet:flex-row">
//       <div className="relative flex h-[156px] w-full items-center justify-center overflow-hidden rounded-3xl tablet:w-[280px]">
//         <Image src="/images/img_login.png" fill objectFit="cover" alt="모임 이미지" />
//       </div>
//       <div className="flex flex-col">
//         <div className="mb-3 flex gap-2">
//           <Chip type="state" className="">
//             이용 예정
//           </Chip>
//           <Chip type="state">개설 확정</Chip>
//         </div>
//         <div className="mb-[18px] flex flex-col gap-[6px]">
//           <span className="flex items-center text-lg font-semibold">
//             {`${"안녕하세요"} |`} <span className="text-#3C3C3C text-sm">을지로 3가</span>
//           </span>
//           <span className="flex gap-3">1월 7일 - 17:30</span>
//         </div>
//         <div className="w-[120px]">
//           <Button
//             size="small"
//             isFilled
//             className="border-orange-primary text-orange-primary border px-0 text-[14px]"
//           >
//             예약 취소하기
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
