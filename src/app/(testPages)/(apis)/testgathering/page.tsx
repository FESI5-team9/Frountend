"use client";

import { useState } from "react";
import {
  CancelGathering,
  LeaveGathering,
  createGathering,
  joinGathering,
} from "@/apis/assignGatheringApi";
import {
  getGatheringDetail,
  getGatheringParticipants,
  getGatherings,
  getMyJoinedGatherings,
} from "@/apis/searchGatheringApi";
import {
  CreateGathering,
  Gatherings,
  GetGatheringParticipants,
  GetMyJoinedGatherings,
} from "@/types/api/gatheringApi";

export default function GatheringTestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null);

  // 모임 목록 조회 테스트
  const testGetGatherings = async () => {
    setLoading(true);
    setError("");
    try {
      const params: Gatherings = {};
      const data = await getGatherings(params);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get gatherings");
    } finally {
      setLoading(false);
    }
  };

  // 모임 생성 테스트
  const testCreateGathering = async () => {
    setLoading(true);
    setError("");
    try {
      const gatheringData: CreateGathering = {
        type: "RESTAURANT",
        location: "제주특별자치도",
        name: "맛집 팀방",
        dateTime: "2024-12-02T07:06:02.489",
        capacity: 10,
        registrationEnd: "2024-12-02T07:21:02.489",
        address1: "string",
        address2: "string",
        description: "string",
        keyword: ["string"],
      };

      const data = await createGathering(gatheringData);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create gathering");
    } finally {
      setLoading(false);
    }
  };

  // 모임 상세 조회 테스트
  const testGetGatheringDetail = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getGatheringDetail(1);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get gathering detail");
    } finally {
      setLoading(false);
    }
  };

  // 모임 참가자 조회 테스트
  const testGetParticipants = async () => {
    setLoading(true);
    setError("");
    try {
      const params: GetGatheringParticipants = {};
      const data = await getGatheringParticipants(1, params); // Test with gathering ID 1
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get participants");
    } finally {
      setLoading(false);
    }
  };

  // 내가 참여한 모임 조회 테스트
  const testGetMyJoinedGatherings = async () => {
    setLoading(true);
    setError("");
    try {
      const params: GetMyJoinedGatherings = {};
      const data = await getMyJoinedGatherings(params);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get joined gatherings");
    } finally {
      setLoading(false);
    }
  };

  // 모임 참여 테스트
  const testJoinGathering = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await joinGathering("1");
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join gathering");
    } finally {
      setLoading(false);
    }
  };

  // 모임 취소 테스트
  const testCancelGathering = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await CancelGathering("5");
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel gathering");
    } finally {
      setLoading(false);
    }
  };

  // 모임 참여 취소 테스트
  const testLeaveGathering = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await LeaveGathering("5");
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to leave gathering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Gathering API Test</h1>

      <div className="md:grid-cols-4 mb-6 grid grid-cols-2 gap-4">
        <button
          onClick={testGetGatherings}
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          모임 목록 조회
        </button>

        <button
          onClick={testCreateGathering}
          disabled={loading}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-gray-400"
        >
          모임 생성
        </button>

        <button
          onClick={testGetGatheringDetail}
          disabled={loading}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:bg-gray-400"
        >
          모임 상세 조회
        </button>

        <button
          onClick={testGetParticipants}
          disabled={loading}
          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 disabled:bg-gray-400"
        >
          특정 모임의 참가자 조회
        </button>

        <button
          onClick={testGetMyJoinedGatherings}
          disabled={loading}
          className="rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600 disabled:bg-gray-400"
        >
          로그인된 사용자가 참석한 모임 조회
        </button>

        <button
          onClick={testJoinGathering}
          disabled={loading}
          className="rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 disabled:bg-gray-400"
        >
          모임 참여
        </button>

        <button
          onClick={testCancelGathering}
          disabled={loading}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:bg-gray-400"
        >
          모임 취소
        </button>

        <button
          onClick={testLeaveGathering}
          disabled={loading}
          className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:bg-gray-400"
        >
          모임 참여 취소
        </button>
      </div>

      {loading && <div className="mb-4 text-gray-600">Loading...</div>}

      {error && <div className="mb-4 rounded bg-red-50 p-4 text-red-500">Error: {error}</div>}

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
