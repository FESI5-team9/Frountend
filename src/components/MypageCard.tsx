import Image from "next/image";
import Button from "@/components/Button/Button";
import Chip from "@/components/Chips";

type MypageCardProps = {
  name: string;
  location: string;
  dateTime: string;
  keywords: string[];
  image: string;
};

export default function MypageCard({ name, location, dateTime, keywords, image }: MypageCardProps) {
  return (
    <div className="flex h-[352px] w-full flex-col gap-4 tablet:flex-row">
      <div className="relative flex h-[156px] w-full items-center justify-center overflow-hidden rounded-3xl tablet:w-[280px]">
        <Image src={image} fill objectFit="cover" alt="모임 이미지" />
      </div>
      <div className="flex flex-col">
        <div className="mb-3 flex gap-2">
          {keywords.map((keyword, index) => (
            <Chip key={index} type="state">
              {keyword}
            </Chip>
          ))}
        </div>
        <div className="mb-[18px] flex flex-col gap-[6px]">
          <span className="flex items-center text-lg font-semibold">
            {`${name} |`} <span className="text-#3C3C3C text-sm">{location}</span>
          </span>
          <span className="flex gap-3">{new Date(dateTime).toLocaleString()}</span>
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

// import Image from "next/image";
// import Button from "@/components/Button/Button";
// import Chip from "@/components/Chips";

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
