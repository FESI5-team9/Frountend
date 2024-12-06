import Image from "next/image";
import Chip from "@/components/Chips";
import Progressbar from "@/components/Progressbar";
// import { CardType } from "@/types/components/card";
import { GetGathering } from "@/types/components/card";
import { formatToKoreanTime, getRemainingHours } from "@/utils/date";

export default function Card({ cardData }: { cardData: GetGathering }) {
  return (
    <div className="border-gray flex w-full flex-col rounded-2xl border-y-2 bg-gray-background tablet:w-auto tablet:flex-row">
      <div className="relative flex">
        <Image
          src={
            cardData.image && cardData.image.trim() !== ""
              ? cardData.image
              : "/images/mainPage/ex-images/donw3.svg"
          }
          alt="food"
          width={272}
          height={153}
          className="h-auto w-full rounded-l-2xl object-cover"
        />
        <div className="absolute right-0 top-0 flex flex-row items-center gap-1 rounded-bl-xl border border-none bg-yellow-primary px-2 py-1">
          <Image src="/images/mainPage/alarm.svg" width={20} height={16} alt="alarm" />
          <p>{getRemainingHours(cardData.registrationEnd) || "날짜 없음"}</p>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between p-4">
        {/* 컴포넌트 / 글자 같은거 넣는 곳이지 */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <h3 className="text-lg">{cardData.name}</h3>
              <p className="border-l-2 px-2 text-sm">{cardData.address1}</p>
            </div>
            <div className="mb-6 flex flex-row gap-2">
              <Chip type="default" bgColor="bg-black" textColor="text-white">
                {formatToKoreanTime(cardData.dateTime, "MM월 dd일") || "날짜 없음"}
              </Chip>
              <Chip type="default" bgColor="bg-black" textColor="text-yellow-primary">
                {formatToKoreanTime(cardData.dateTime, "HH시 mm분") || "날짜 없음"}
              </Chip>
            </div>
          </div>
          <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full border">
            <Image src="/images/mainPage/heart.svg" alt="like" width={24} height={24} />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex w-3/5 flex-col gap-2 tablet:w-3/5 desktop:w-3/5">
            <div className="flex flex-row gap-2 text-sm">
              <div className="flex gap-1">
                <Image src="/images/mainPage/card/people.svg" width={16} height={16} alt="people" />
                <p>
                  {cardData.participantCount} / {cardData.capacity}
                </p>
              </div>
              <div className="flex gap-1">
                <Image
                  src="/images/mainPage/card/ic_check.svg"
                  width={16}
                  height={16}
                  alt="people"
                />
                <div>개설확정</div>
              </div>
            </div>
            <Progressbar now={cardData.participantCount} max={cardData.capacity} />
          </div>
          <div className="rounded-xl border bg-yellow-primary px-4 py-2 text-black">참여하기</div>
        </div>
      </div>
    </div>
  );
}
