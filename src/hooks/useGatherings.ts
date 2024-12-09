// useGatherings.ts
import { useEffect, useState } from "react";
import { getMyJoinedGatherings } from "@/apis/searchGatheringApi";
import { GetMyJoinedGatheringsRes } from "@/types/api/gatheringApi";
import { Direction } from "@/types/api/gatheringApi";

export const useGatherings = () => {
  const [gatherings, setGatherings] = useState<GetMyJoinedGatheringsRes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGatherings = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          completed: true,
          reviewed: false,
          size: 10,
          page: 0,
          sort: "id.gathering.dateTime",
          direction: "desc" as Direction,
        };
        const data = await getMyJoinedGatherings(params);
        setGatherings(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchGatherings();
  }, []);

  return { gatherings, loading, error };
};
