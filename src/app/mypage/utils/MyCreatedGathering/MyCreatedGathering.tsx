"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getMyGathering } from "@/apis/searchGatheringApi";
import Button from "@/components/Button/Button";
import { Gathering } from "@/types/api/gatheringApi";
import { formatToKoreanTime } from "@/utils/date";

export default function MyCreatedGathering() {
  const [gatheringData, setGatheringData] = useState<Gathering | undefined>(undefined);

  useEffect(() => {
    async function fetchGatheringData() {
      const params = {
        size: 10,
        page: 0,
        sort: "dataTime",
        direction: "DESC" as const,
      };

      try {
        const response = await getMyGathering(params);
        const data = response;

        setGatheringData(data);
      } catch (error) {}
    }

    fetchGatheringData();
  }, []);

  if (!gatheringData) {
    return <div>Loading...</div>;
  }

  const date = formatToKoreanTime(gatheringData.dateTime, "MM월 dd일");
  const time = formatToKoreanTime(gatheringData.dateTime, "HH시 mm분");

  return (
    <>
      <div className="flex h-[352px] w-full flex-col gap-4 tablet:h-[153px] tablet:flex-row">
        <div className="relative flex h-[153px] w-full items-center justify-center overflow-hidden rounded-3xl tablet:w-[280px]">
          <Image
            src={gatheringData.image || "/images/image.png"}
            fill
            objectFit="cover"
            alt="모임 이미지"
            className=""
          />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-3">
            <div className="mb-[18px] flex flex-col gap-1.5">
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="inline-block">{gatheringData.name}</span>
                <span className="inline-block">|</span>
                <span className="text-#3C3C3C inline-block text-sm">
                  &nbsp;{`${gatheringData.location} ${gatheringData.address1}`}
                </span>
              </span>
              <div className="flex items-center gap-3">
                <span className="text-#3C3C3C flex gap-3 text-sm">{`${date} · ${time}`}</span>
                <span className="flex gap-0.5">
                  <Image
                    src="/icons/person.svg"
                    width={16}
                    height={16}
                    alt="참여 인원"
                    className="inline-block"
                  />
                  <span className="inline-block text-sm">{`${gatheringData.participantCount}/${gatheringData.capacity}`}</span>
                </span>
              </div>
            </div>
          </div>
          <Button size="small" bgColor="disabled" className="w-[120px] px-0 text-sm text-white">
            조기 마감
          </Button>
        </div>
      </div>
    </>
  );
}
