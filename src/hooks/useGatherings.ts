// useGatherings.ts
import { useEffect, useState } from "react";
import { getMyJoinedGatherings } from "@/apis/searchGatheringApi";
import { GetMyJoinedGatheringsRes } from "@/types/api/gatheringApi";

export const useGatherings = () => {
  const [gatherings, setGatherings] = useState<GetMyJoinedGatheringsRes>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGatherings = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        completed: false,
        reviewed: false,
        size: 10,
        page: 0,
        sort: "id.gathering.dateTime",
        direction: "desc" as const,
      };
      const data = await getMyJoinedGatherings(params);
      setGatherings(data);
    } catch (err) {
      setError("데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGatherings();
  }, []);

  return { gatherings, loading, error };
};
