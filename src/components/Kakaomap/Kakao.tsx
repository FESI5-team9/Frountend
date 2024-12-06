import { useCallback, useEffect, useState } from "react";
import { PostcodeData } from "@/types/components/kakaoMap";
import Button from "../Button/Button";

export default function Kakao({
  onAddressSelect,
}: {
  onAddressSelect: (address1: string, address2: string, postcode: string) => void;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 토글 상태
  const [isScriptLoaded, setIsScriptLoaded] = useState(false); // 스크립트 로드 상태

  // Daum Postcode API 스크립트 동적 로드
  useEffect(() => {
    if (window.daum?.Postcode) {
      setIsScriptLoaded(true); // 이미 로드된 경우
      return;
    }

    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true); // 스크립트 로드 완료 시 상태 업데이트
    script.onerror = () => console.error("Daum Postcode API 로드 실패");
    document.body.appendChild(script); // 스크립트를 동적으로 body에 추가

    return () => {
      // 스크립트 클린업
      document.body.removeChild(script);
    };
  }, []);

  // onAddressSelect를 useCallback으로 래핑
  const handleAddressSelect = useCallback(
    (location: string, address1: string, address2: string) => {
      onAddressSelect(location, address1, address2);
    },
    [onAddressSelect], // 의존성 배열에 onAddressSelect 추가
  );

  // 주소 검색창 열기 로직
  useEffect(() => {
    if (isSearchOpen && isScriptLoaded) {
      const container = document.getElementById("postcode-container");
      if (container) {
        new window.daum.Postcode({
          oncomplete: (data: PostcodeData) => {
            const location = `${data.sido}`;
            const address1 = `${data.sigungu}`; // 시/도 + 구
            const address2 = data.roadAddress || ""; // 도로명 주소

            handleAddressSelect(location, address1, address2); // 최신 상태의 handleAddressSelect 호출
            setIsSearchOpen(false); // 검색창 닫기
          },
          width: "100%",
          height: "100%",
        }).embed(container);
      }
    }
  }, [isSearchOpen, isScriptLoaded, handleAddressSelect]); // handleAddressSelect 추가

  return (
    <div>
      <Button
        bgColor="yellow"
        size="small"
        type="button"
        onClick={() => setIsSearchOpen(prev => !prev)}
      >
        {isSearchOpen ? "닫기" : "주소 검색"}
      </Button>

      {/* Postcode 검색창 컨테이너 */}
      <div
        id="postcode-container"
        className="mt-4 rounded-md border p-4"
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}
