"use client";

import { useState } from "react";
import { createGathering } from "@/apis/assignGatheringApi";
import { CreateGathering } from "@/types/api/gatheringApi";

export default function CreateTestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [file, setFile] = useState<File | null>(null);

  // 모임 생성 테스트 함수
  const testCreateGathering = async () => {
    setLoading(true);
    setError("");
    try {
      if (file) {
        const gatheringData: CreateGathering = {
          type: "RESTAURANT",
          location: "서울",
          name: "병천 순대국",
          dateTime: "2024-12-05T07:06:02.489",
          openParticipantCount: "2",
          capacity: 10,
          address1: "서울 중구",
          address2: "서울 중구 삼일대로 343",
          description: "순대국 맛이 맛있었어요!",
          keyword: ["병천순대", "가성비"],
        };

        const data = await createGathering(gatheringData, file);
        setResponse(data);
      } else {
        setError("No file selected");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create gathering");
    } finally {
      setLoading(false);
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  // 버튼 스타일
  const buttonClassName =
    "rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-gray-400";

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Gathering API Test</h1>
      <div className="md:grid-cols-4 mb-6 grid grid-cols-2 gap-4">
        {/* 파일 업로드 */}
        <label htmlFor="fileInput" className={`${buttonClassName} cursor-pointer`}>
          Upload Image
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* 모임 생성 버튼 */}
        <button onClick={testCreateGathering} disabled={loading} className={buttonClassName}>
          모임 생성
        </button>
      </div>

      {/* 로딩 상태 */}
      {loading && <div className="mb-4 text-gray-600">Loading...</div>}

      {/* 에러 메시지 */}
      {error && <div className="mb-4 rounded bg-red-50 p-4 text-red-500">Error: {error}</div>}

      {/* API 응답 */}
      {response && (
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-semibold">Response:</h2>
          <pre className="max-h-96 overflow-auto rounded bg-gray-100 p-4">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
