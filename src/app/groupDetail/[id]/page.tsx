import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
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

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/gatherings/${id}`);

  const initialData = await response.json();

  queryClient.setQueryData(["gatheringDetail", id], initialData);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupDetail paramsId={id} initialData={initialData} />
    </HydrationBoundary>
  );
}

export default GroupDetailPage;
