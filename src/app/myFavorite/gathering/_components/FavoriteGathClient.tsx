"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getFavoriteGatherings } from "@/apis/favoriteGatheringApi";
import Card from "@/app/(home)/_components/Card";
import CardSkeleton from "@/app/(home)/_components/Skeleton/SKCard";
import { GetGathering } from "@/types/components/card";

type GatheringFilters = Record<string, string | number | null>;

export default function FavoriteGathClient() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["favorite/gatherings"] }); // 타입 오류 해결
  }, [queryClient]);

  // 필터 메모이제이션
  const filters = useMemo(() => {
    const f: GatheringFilters = {};
    searchParams.forEach((value, key) => {
      if (
        ["id", "type", "startDate", "endDate", "location", "createdBy", "direction"].includes(key)
      ) {
        f[key] = value;
      }
    });
    f.size = 4; // 페이지 크기
    return f;
  }, [searchParams]);

  // React Query의 useInfiniteQuery를 사용한 페이지네이션 및 캐싱
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ["favorite/gatherings", filters], // 필터를 queryKey로 사용해 캐싱 구분
    queryFn: async ({ pageParam = 0 }) => {
      const result = await getFavoriteGatherings({ ...filters, page: pageParam });
      return { data: result, nextPage: result.length > 0 ? pageParam + 1 : undefined };
    },
    initialPageParam: 0, // 첫 페이지 초기값
    getNextPageParam: lastPage => lastPage.nextPage, // 다음 페이지 설정
    staleTime: 5 * 60 * 1000, // 캐시 만료 시간 5분
  });

  // IntersectionObserver로 무한 스크롤 구현
  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage(); // 다음 페이지 요청
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetching]);

  // 데이터 병합 및 중복 제거
  const allData = Array.from(
    new Map((data?.pages.flatMap(page => page.data) || []).map(item => [item.id, item])).values(),
  );

  // 데이터 없을 때 화면 표시
  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-gray-400">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (allData.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-gray-400">
        <p>아직 모임이 없어요.</p>
        <p>지금 바로 모임을 만들어보세요.</p>
      </div>
    );
  }

  return (
    <div className="gathering-list my-6 flex flex-col gap-3">
      {allData.map((gathering: GetGathering) => (
        <Card key={gathering.id} cardData={gathering} />
      ))}
      {isFetching &&
        Array.from({ length: 4 }).map((_, index) => <CardSkeleton key={`skeleton-${index}`} />)}

      <div ref={observerRef} className="h-10 w-full bg-transparent"></div>
    </div>
  );
}
