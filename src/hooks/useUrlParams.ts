import { useRouter } from "next/navigation";

// interface QueryParams {
//   search?: string;
//   type?: string;
//   limit?: number;
//   offset?: number;
//   sortBy?: string;
//   dateTime?: string;
//   location?: string;
//   direction?: string;
//   startDate?: string;
//   endDate?: string;
// }

const useQueryBuilder = () => {
  const router = useRouter();

  const updateQueryParams = (newParams: Record<string, string | undefined | null>) => {
    const currentParams = new URLSearchParams(window.location.search); // 현재 쿼리 파라미터 가져오기

    // 새 파라미터를 현재 파라미터와 병합하면서 값이 없는 키는 제거
    for (const key in newParams) {
      const value = newParams[key];
      if (value === undefined || value === null || value === "") {
        currentParams.delete(key); // 값이 없으면 키 삭제
      } else {
        currentParams.set(key, value); // 값이 있으면 추가/업데이트
      }
    }

    // 현재 경로를 명시적으로 설정하여 `/`가 붙지 않도록 처리
    const basePath = window.location.pathname !== "/" ? window.location.pathname : "";

    router.push(`${basePath}?${currentParams.toString()}`); // 새로운 URL로 이동
  };

  return updateQueryParams;
};

export default useQueryBuilder;
