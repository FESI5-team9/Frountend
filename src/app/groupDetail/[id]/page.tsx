import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getGatheringDetail } from "@/apis/searchGatheringApi";
import GroupDetail from "../_components/GroupDetail";

async function GroupDetailPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  const id = Number(params.id);

  if (!id || isNaN(id)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Invalid request. ID is required.</p>
      </div>
    );
  }

  await queryClient.prefetchQuery({
    queryKey: ["gatheringDetail", id],
    queryFn: () => getGatheringDetail(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupDetail paramsId={id} />
    </HydrationBoundary>
  );
}

export default GroupDetailPage;
