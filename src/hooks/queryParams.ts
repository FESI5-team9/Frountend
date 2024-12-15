const buildQueryParams = <
  T extends Record<string, string | number | boolean | null | undefined | Array<string | number>>,
>(
    existingParams: URLSearchParams,
    newParams: T,
  ) => {
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
