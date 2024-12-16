import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getGatheringDetail } from "@/apis/searchGatheringApi";
import GroupDetail from "../_components/GroupDetail";

async function GroupDetailPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  if (!params.id || isNaN(Number(params.id))) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Invalid request. ID is required.</p>
      </div>
    );
  }

  await queryClient.prefetchQuery({
    queryKey: ["gatheringDetail", params.id],
    queryFn: () => getGatheringDetail(Number(params.id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupDetail paramsId={params.id} />
    </HydrationBoundary>
  );
}

export default GroupDetailPage;
