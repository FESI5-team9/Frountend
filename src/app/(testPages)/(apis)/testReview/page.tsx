"use client";

import { useState } from "react";
import { addReviews, getReviews, getReviewsRating } from "@/apis/reviewsApi";
import { AddReviews, GetReviews, GetReviewsRating } from "@/types/api/reviews";

export default function ReviewsTestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null);

  // 리뷰 목록 조회
  const testGetReviews = async () => {
    setLoading(true);
    try {
      const updateData: GetReviews = {};
      const data = await getReviews(updateData);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "getReviews failed");
    } finally {
      setLoading(false);
    }
  };

  // 리뷰 추가
  const testAddReviews = async () => {
    setLoading(true);
    try {
      const AddData: AddReviews = {
        gatheringId: 1,
        score: 3,
        comment: "잘 보고 갑니다",
      };
      const data = await addReviews(AddData);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "addReviews failed");
    } finally {
      setLoading(false);
    }
  };

  // 리뷰 평점 목록 조회
  const testReviewsRating = async () => {
    setLoading(true);
    try {
      const updateData: GetReviewsRating = {};
      const data = await getReviewsRating(updateData);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "getReviewsRating failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Auth API Test</h1>

      <div className="mb-6 space-x-4">
        <button
          onClick={testGetReviews}
          disabled={loading}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-gray-400"
        >
          Get reviews
        </button>

        <button
          onClick={testAddReviews}
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          Test AddReview
        </button>

        <button
          onClick={testReviewsRating}
          disabled={loading}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:bg-gray-400"
        >
          Get ReviewsRating
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
