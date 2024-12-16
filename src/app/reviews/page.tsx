import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getReviewStats, getReviews } from "@/apis/reviewsApi";
import AllReviews from "./_components/AllReviews";

async function Reviews() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      "reviews",
      { size: 10, type: "CAFE", location: undefined, date: undefined, sort: "createdAt" },
    ],
    queryFn: () => getReviews({ type: "CAFE" }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["stats", { type: "CAFE" }],
    queryFn: () => getReviewStats("CAFE"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllReviews />
    </HydrationBoundary>
  );
}

export default Reviews;
