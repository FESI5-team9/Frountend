import { useRouter } from "next/navigation";

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

export const buildQueryParams = (existingParams: URLSearchParams, newParams: QueryParams) => {
  // 기존 파라미터에 새 파라미터 병합
  Object.entries(newParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      existingParams.set(key, String(value)); // 새로운 값 설정
    } else {
      existingParams.delete(key); // 값이 없으면 삭제
    }
  });

  return existingParams.toString();
};

export const useQueryBuilder = () => {
  const router = useRouter();

  const updateQueryParams = (newParams: QueryParams) => {
    const currentParams = new URLSearchParams(window.location.search); // 현재 쿼리 파라미터 가져오기
    const updatedParams = buildQueryParams(currentParams, newParams); // 병합된 쿼리 생성

    router.push(`/search?${updatedParams}`); // 새로운 URL로 이동
  };

  return updateQueryParams;
};
