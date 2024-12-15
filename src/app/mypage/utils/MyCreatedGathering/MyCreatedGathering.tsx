"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getMyGathering } from "@/apis/searchGatheringApi";
import Button from "@/components/Button/Button";
import { Gathering } from "@/types/api/gatheringApi";
import { formatToKoreanTime } from "@/utils/date";

export default function MyCreatedGathering() {
  const [gatheringData, setGatheringData] = useState<Gathering[] | undefined>(undefined);

  useEffect(() => {
    async function fetchGatheringData() {
      const params = {
        size: 10,
        page: 0,
        sort: "dateTime",
        direction: "DESC" as const,
      };

      try {
        const response = await getMyGathering(params);
        setGatheringData(response);
      } catch (error) {}
    }

    fetchGatheringData();
  }, []);

  if (!gatheringData) {
    return <div>아직 만든 모임이 없습니다.</div>;
  }

  return (
    <>
      {gatheringData.map((gathering: Gathering) => {
        const date = gathering.dateTime
          ? formatToKoreanTime(gathering.dateTime, "M월 dd일")
          : "날짜 없음";
        const time = gathering.dateTime
          ? formatToKoreanTime(gathering.dateTime, "HH시 mm분")
          : "시간 없음";

        return (
          <>
            <div
              key={gathering.id}
              className="flex w-full flex-col gap-4 tablet:h-[153px] tablet:flex-row"
            >
              <div className="relative flex h-[153px] w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-3xl tablet:w-[280px]">
                <Image
                  src={gathering.image || "/images/image.png"}
                  fill
                  objectFit="cover"
                  alt="모임 이미지"
                  className="flex items-center justify-center"
                />
              </div>
              <div className="flex w-full flex-col justify-between">
                <div className="flex gap-3">
                  <div className="mb-[18px] flex flex-col gap-1.5">
                    <span className="flex items-center gap-2 text-lg font-semibold">
                      <span className="inline-block max-w-[135px] truncate tablet:max-w-[170px] desktop:max-w-[300px]">
                        {gathering.name}
                      </span>
                      <span className="inline-block">|</span>
                      <span className="text-#3C3C3C inline-block max-w-[135px] truncate text-sm tablet:max-w-[155px] desktop:max-w-[300px]">
                        &nbsp;{`${gathering.location} ${gathering.address1}`}
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
                        <span className="inline-block text-sm">{`${gathering.participantCount}/${gathering.capacity}`}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex tablet:justify-end tablet:pb-1">
                  <Button
                    size="small"
                    bgColor="disabled"
                    className="w-[120px] px-0 text-sm text-white"
                  >
                    조기 마감
                  </Button>
                </div>
              </div>
            </div>
            <div className="my-5 border border-dashed border-gray-400"></div>
          </>
        );
      })}
    </>
  );
}
