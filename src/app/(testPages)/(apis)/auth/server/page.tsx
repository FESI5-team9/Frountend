// src/app/test/page.tsx
import { getUserProfile } from "@/apis/authApi";
import { getGatherings } from "@/apis/searchGatheringApi";

export default async function TestPage() {
  const data = await getUserProfile();
  const gathering = await getGatherings(
    {},
    {
      next: {
        revalidate: 300,
        tags: ["custom-tag"],
      },
    },
  );

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">API 테스트 페이지</h1>

      <div className="space-y-4">
        {data && (
          <div className="rounded bg-green-100 p-4">
            <h2 className="mb-2 font-bold">Response:</h2>
            <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
        {gathering && (
          <div className="rounded bg-green-100 p-4">
            <h2 className="mb-2 font-bold">Response:</h2>
            <pre className="whitespace-pre-wrap">{JSON.stringify(gathering, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
