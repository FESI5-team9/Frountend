import { QueryClient } from "@tanstack/react-query";

const getQueryClient = (() => {
  let queryClient: QueryClient | null = null;

  return () => {
    if (!queryClient) {
      queryClient = new QueryClient();
    }
    return queryClient;
  };
})();

export default getQueryClient;
