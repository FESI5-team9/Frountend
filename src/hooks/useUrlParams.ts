import { useRouter } from "next/navigation";
import buildQueryParams from "./queryParams";

interface QueryParams {
  search?: string;
  type?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  dateTime?: string;
  location?: string;
  direction?: string;
}

const useQueryBuilder = () => {
  const router = useRouter();

  const updateQueryParams = (newParams: QueryParams) => {
    const currentParams = new URLSearchParams(window.location.search); // 현재 쿼리 파라미터 가져오기
    const updatedParams = buildQueryParams(currentParams, newParams); // 병합된 쿼리 생성

    // 현재 경로를 명시적으로 설정하여 `/`가 붙지 않도록 처리
    const basePath = window.location.pathname !== "/" ? window.location.pathname : "";

    router.push(`${basePath}?${updatedParams}`); // 새로운 URL로 이동
  };

  return updateQueryParams;
};

export default useQueryBuilder;
