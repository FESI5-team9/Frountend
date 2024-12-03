"use client";

import { useState } from "react";
import { getUserProfile, signin, signup, updateUserProfile } from "@/apis/authApi";
import { Login, PostUsers, PutUsers } from "@/types/api/authApi";

export default function AuthTestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null);

  // 회원가입 테스트
  const testSignup = async () => {
    setLoading(true);
    try {
      const signupData: PostUsers = {
        email: "test@test.com",
        password: "test1234!",
        name: "test",
        nickname: "test1",
      };
      const data = await signup(signupData);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // 로그인 테스트
  const testSignin = async () => {
    setLoading(true);
    try {
      const loginData: Login = {
        email: "test@test.com",
        password: "test1234!",
      };
      const data = await signin(loginData);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  // 유저 정보 조회 테스트
  // 테스트 전에 fetchInstance에서 토큰 하드코딩으로 넣어줘야 합니다.
  const testGetProfile = async () => {
    setLoading(true);
    try {
      const data = await getUserProfile();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get user profile");
    } finally {
      setLoading(false);
    }
  };

  // 유저 정보 수정 테스트
  const testUpdateProfile = async () => {
    setLoading(true);
    try {
      const updateData: PutUsers = {
        nickname: "testtest",
      };
      const data = await updateUserProfile(updateData);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Auth API Test</h1>

      <div className="mb-6 space-x-4">
        <button
          onClick={testSignup}
          disabled={loading}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-gray-400"
        >
          Test Signup
        </button>

        <button
          onClick={testSignin}
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          Test Signin
        </button>

        <button
          onClick={testGetProfile}
          disabled={loading}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:bg-gray-400"
        >
          Get Profile
        </button>

        <button
          onClick={testUpdateProfile}
          disabled={loading}
          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 disabled:bg-gray-400"
        >
          Update Profile
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
