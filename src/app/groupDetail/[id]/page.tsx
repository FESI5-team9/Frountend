import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getGatheringDetail } from "@/apis/searchGatheringApi";
import GroupDetail from "../_components/GroupDetail";

async function GroupDetailPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", params.id],
    queryFn: () => getGatheringDetail(Number(params.id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupDetail params={params} />
    </HydrationBoundary>
  );
}

export default GroupDetailPage;
