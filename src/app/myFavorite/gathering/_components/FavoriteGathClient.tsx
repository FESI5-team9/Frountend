"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFavoriteGatherings } from "@/apis/favoriteGatheringApi";
import Card from "@/app/(home)/_components/Card";
import CardSkeleton from "@/app/(home)/_components/Skeleton/SKCard";
import { GetGathering } from "@/types/components/card";

type GatheringFilters = Record<string, string | number | null>;

export default function FavoriteGathClient() {
  const searchParams = useSearchParams();
  const [allData, setAllData] = useState<GetGathering[]>([]);
  const [page, setPage] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const getFilters = (): GatheringFilters => {
    const filters: GatheringFilters = {};
    searchParams.forEach((value, key) => {
      if (
        [
          "id",
          "type",
          "startDate",
          "endDate",
          "location",
          "createdBy",
          "sort",
          "direction",
        ].includes(key)
      ) {
        filters[key] = value;
      }
    });
    filters.page = page;
    filters.size = 10;
    return filters;
  };

  const { isFetching, refetch } = useQuery({
    queryKey: ["gatherings/favorite", { ...getFilters(), page }],
    queryFn: async () => {
      const filters = getFilters();
      const data = await getFavoriteGatherings(filters);

      if (data.length === 0 && page > 0) {
        setIsEndReached(true);
      }

      setAllData(prevData => (page === 0 ? data : [...prevData, ...data]));
      return data;
    },
    enabled: !isEndReached,
    keepPreviousData: true,
    staleTime: 300000,
    cacheTime: 600000,
    retry: 1,
    onSuccess: () => {
      if (page === 0) setAllData([]);
    },
  });

  useEffect(() => {
    setPage(0);
    setAllData([]);
    setIsEndReached(false);
    refetch();
  }, [searchParams, refetch]);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isFetching && !isEndReached) {
        setPage(prevPage => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, { threshold: 1.0 });
    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isFetching, isEndReached]);

  if (allData.length === 0 && page === 0 && !isFetching) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-gray-400">
        <p>아직 모임이 없어요.</p>
        <p>지금 바로 모임을 만들어보세요.</p>
      </div>
    );
  }

  return (
    <div className="gathering-list my-6 flex flex-col gap-3">
      {allData.map((gathering: GetGathering, index: number) => (
        <Card key={index} cardData={gathering} />
      ))}

      {isFetching && Array.from({ length: 3 }).map((_, index) => <CardSkeleton key={index} />)}
      {!isEndReached && <div ref={observerRef} className="h-10 w-full bg-transparent"></div>}
    </div>
  );
}
