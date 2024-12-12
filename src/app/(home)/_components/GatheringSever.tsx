import { getGatherings } from "@/apis/searchGatheringApi";
import { GetGathering } from "@/types/components/card";
import Card from "./Card";

// 에러 메시지를 보여줄 컴포넌트
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-gray-disable">
      <p>에러가 발생했어요: {message}</p>
    </div>
  );
}

// 데이터가 비었을 때 보여줄 컴포넌트
function EmptyMessage() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-gray-disable">
      <p>아직 모임이 없어요.</p>
      <p>지금 바로 모임을 만들어보세요</p>
    </div>
  );
}

// 데이터가 있을 경우 렌더링할 컴포넌트
function GatheringList({ gatherings }: { gatherings: GetGathering[] }) {
  if (!Array.isArray(gatherings) || gatherings.length === 0) {
    console.error("Invalid gatherings data:", gatherings);
    return <ErrorMessage message="잘못된 데이터 형식입니다." />;
  }

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-between px-2 py-[59px] tablet:w-[744px] tablet:justify-start tablet:px-1.5 desktop:w-[1200px] desktop:px-0">
      <div className="mt-5 flex flex-col gap-4 p-2">
        {gatherings.map((gathering, idx) => (
          <Card cardData={gathering} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default async function GatheringServer() {
  let gatherings: GetGathering[] = [];

  try {
    const response = await getGatherings({});
    gatherings = Array.isArray(response) ? response : [];
  } catch (error) {
    return <ErrorMessage message={error instanceof Error ? error.message : "알 수 없는 에러"} />;
  }

  if (gatherings.length === 0) {
    return <EmptyMessage />;
  }

  return <GatheringList gatherings={gatherings} />;
}
