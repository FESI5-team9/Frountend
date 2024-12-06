"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getGatherings } from "@/apis/searchGatheringApi";
import { Gatherings } from "@/types/api/gatheringApi";
import { GetGathering } from "@/types/components/card";
import Card from "./Card";
import FilterSection from "./FilterSection";
import HeroSection from "./HeroSection";
import SelectedType from "./SelectedType";

function Gathering() {
  // const [, setLocationOption] = useState("");
  const [gatherings, setGatherings] = useState<GetGathering[]>([]);
  const [, setLoading] = useState(false);
  const [, setError] = useState("");
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params: Gatherings = {}; // 요청에 필요한 파라미터
      const data: GetGathering[] = await getGatherings(params); // 데이터 가져오기
      setGatherings(data); // 상태 업데이트
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get gatherings");
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  }, []);

  // useEffect에서 fetchData 호출
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col justify-between px-2 py-[59px] tablet:w-[744px] tablet:justify-start tablet:px-1.5 desktop:w-[1200px] desktop:px-0">
      <HeroSection />
      <SelectedType />
      <FilterSection />

      {query ? (
        <div className="mt-5 flex flex-col gap-4 p-2">
          {gatherings.map((gathering, idx) => (
            <Card cardData={gathering} key={idx} />
          ))}
        </div>
      ) : (
        <div className="flex h-[60vh] flex-col items-center justify-center text-gray-disable">
          <p>아직 모임이 없어요.</p>
          <p>지금 바로 모임을 만들어보세요</p>
        </div>
      )}
    </main>
  );
}

export default Gathering;
