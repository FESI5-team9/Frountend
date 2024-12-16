interface QueryParams {
  search?: string;
  type?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  dateTime?: string;
  location?: string;
  direction?: string;
  page?: number;
  size?: number;
}

const buildQueryParams = (existingParams: URLSearchParams, newParams: QueryParams) => {
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

export default buildQueryParams;
