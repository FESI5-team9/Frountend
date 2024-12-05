import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getReviews } from "@/apis/reviewsApi";
import HeaderComponent from "./_components/HeaderComponent";
import RatingComponent from "./_components/RatingComponent";
import ReviewListComponent from "./_components/ReviewListComponent";

async function Reviews() {
  const queryClient = new QueryClient();

  // 기본값으로 CAFE 설정
  await queryClient.prefetchQuery({
    queryKey: ["reviews", { size: 10, type: "CAFE" }],
    queryFn: () => getReviews({ type: "CAFE" }),
  });

  return (
    <>
      {/* <HeaderComponent type={selectedType} onTypeChange={setSelectedType} />
      <RatingComponent type={selectedType} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReviewListComponent type={selectedType} />
      </HydrationBoundary> */}
      <HeaderComponent />
      <RatingComponent />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReviewListComponent />
      </HydrationBoundary>
    </>
  );
}

export default Reviews;
