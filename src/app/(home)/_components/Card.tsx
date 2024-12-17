import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/Button/FavoriteButton";
import Chip from "@/components/Chips";
import Progressbar from "@/components/Progressbar";
import { GetGathering } from "@/types/components/card";
import { formatToOriginTime, getRemainingOriginHours } from "@/utils/date";
import ButtonJoin from "./ButtonJoin";

export default function Card({ cardData }: { cardData: GetGathering }) {
  return (
    <div className="border-gray flex w-full transform flex-col rounded-2xl border-y-2 bg-gray-background transition-transform duration-200 hover:shadow-xl tablet:h-[156px] tablet:w-full tablet:flex-row">
      <Link href={`groupDetail/${cardData.id}`} className="relative flex">
        <Image
          src={
            cardData.image && cardData.image.trim() !== ""
              ? cardData.image
              : "/images/mainPage/ex-images/muckit.svg"
          }
          alt="food"
          width={272}
          height={153}
          className="w-full rounded-l-2xl object-cover tablet:h-[153px] tablet:w-[272px]"
        />
        <div className="absolute right-0 top-0 flex flex-row items-center gap-1 rounded-bl-xl border border-none bg-yellow-primary px-2 py-1">
          <Image src="/images/mainPage/alarm.svg" width={20} height={16} alt="alarm" />
          <p>{getRemainingOriginHours(cardData.registrationEnd) || "날짜 없음"}</p>
        </div>
      </Link>
      <div className="flex w-full flex-col justify-between p-4">
        {/* 컴포넌트 / 글자 같은거 넣는 곳이지 */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <Link href={`groupDetail/${cardData.id}`} className="text-lg hover:underline">
                {cardData.name}
              </Link>
              <p className="border-l-2 px-2 text-sm">{cardData.address1}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Chip type="default" bgColor="bg-black" textColor="text-white">
                {formatToOriginTime(cardData.dateTime, "MM월 dd일") || "날짜 없음"}
              </Chip>
              <Chip type="default" bgColor="bg-black" textColor="text-yellow-primary">
                {formatToOriginTime(cardData.dateTime, "HH시 mm분") || "날짜 없음"}
              </Chip>
            </div>
          </div>
          {/* 찜하기 */}
          <FavoriteButton gatheringId={cardData.id} initialFavorite={cardData.favorite} />
        </div>
        {/* 밑에 컴포넌트 */}
        <div className="flex items-end justify-between">
          <div className="mt-4 flex w-3/5 flex-col gap-2 tablet:w-3/5 desktop:w-3/5">
            <div className="flex flex-row gap-2 text-sm">
              <div className="flex gap-1">
                <Image src="/images/mainPage/card/people.svg" width={16} height={16} alt="people" />
                <p>
                  {cardData.participantCount} / {cardData.capacity}
                </p>
              </div>
              {cardData.open && (
                <div className="flex gap-1">
                  <Image
                    src="/images/mainPage/card/ic_check.svg"
                    width={16}
                    height={16}
                    alt="people"
                  />
                  <div>개설확정</div>
                </div>
              )}
            </div>
            <Progressbar now={cardData.participantCount} max={cardData.capacity} />
          </div>
          <ButtonJoin id={cardData.id} participation={cardData.participation} />
        </div>
      </div>
    </div>
  );
}
