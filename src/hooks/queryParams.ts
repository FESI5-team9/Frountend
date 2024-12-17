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
      if (Array.isArray(value)) {
        value.forEach(item => {
          existingParams.append(key, String(item));
        });
      } else {
        existingParams.set(key, String(value));
      }
    } else {
      existingParams.delete(key);
    }
  });

  return existingParams.toString();
};

export default buildQueryParams;
