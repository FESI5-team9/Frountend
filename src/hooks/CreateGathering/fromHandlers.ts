import { Dispatch, SetStateAction } from "react";

// 폼 데이터 타입 정의
export interface CreateGatheringFormData {
  name: string;
  type: string;
  location: string;
  image?: File | null;
  dateTime: string;
  capacity: number;
  description: string;
  address1: string;
  address2: string;
  openParticipantCount: number;
  keywords: string[];
}

// 핸들러 함수들
export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFormData: Dispatch<SetStateAction<CreateGatheringFormData>>,
) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));
};

// 주소 업데이트 핸들러
export const handleAddressSelect = (
  location: string,
  address1: string,
  address2: string,
  setSelectedAddress: Dispatch<
  SetStateAction<{ location: string; address1: string; address2: string }>
  >,
  setFormData: Dispatch<SetStateAction<CreateGatheringFormData>>,
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>,
) => {
  setSelectedAddress({ location, address1, address2 });
  setFormData(prev => ({
    ...prev,
    location,
    address1,
    address2,
  }));
  setIsSearchOpen(false); // 주소 선택 후 검색창 닫기
  // console.log("상위 컴포넌트로 전달된 주소 데이터:", { location, address1, address2 }); // 디버깅용 로그
};

// 파일 변경 핸들러
export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: Dispatch<SetStateAction<CreateGatheringFormData>>,
) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    setFormData(prev => ({
      ...prev,
      image: files[0],
    }));
  }
};

// 날짜 선택 핸들러
export const handleDateSelect = (
  date: Date,
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>,
  setFormData: Dispatch<SetStateAction<CreateGatheringFormData>>,
) => {
  setSelectedDate(date);
  setFormData(prev => ({
    ...prev,
    dateTime: date.toISOString().split("T")[0],
  }));
};

// 시간 선택 핸들러
export const handleTimeSelect = (
  time: string,
  selectedDate: Date | undefined,
  setSelectedTime: Dispatch<SetStateAction<string>>,
  setFormData: Dispatch<SetStateAction<CreateGatheringFormData>>,
) => {
  setSelectedTime(time);

  if (selectedDate) {
    // 선택된 시간을 기준으로 Date 객체 생성
    const [hours, minutes] = time.split(":").map(Number);
    const dateTime = new Date(selectedDate);
    dateTime.setHours(hours, minutes);

    // -6시간 계산
    const registrationEnd = new Date(dateTime);
    registrationEnd.setHours(dateTime.getHours() - 6);

    // formData 업데이트
    setFormData(prev => ({
      ...prev,
      dateTime: `${selectedDate.toISOString().split("T")[0]}T${time}:00`,
      registrationEnd: registrationEnd.toISOString(),
    }));
  }
};

// 제출 핸들러
export const handleSubmit = async (
  e: React.FormEvent,
  formData: CreateGatheringFormData & { image?: File | null },
  setIsOpen: Dispatch<SetStateAction<boolean>>,
) => {
  e.preventDefault();
  const formDataToSend = new FormData();

  // FormData 생성
  Object.entries(formData).forEach(([key, value]) => {
    if (key === "image" && value instanceof File) {
      formDataToSend.append(key, value); // 파일 추가
    } else if (value !== null && value !== undefined) {
      const processedValue = Array.isArray(value) ? JSON.stringify(value) : String(value);
      // console.log(`Appending key: ${key}, value: ${processedValue}`); // 디버깅용
      formDataToSend.append(key, processedValue);
    }
  });

  try {
    // 환경 변수에서 API URL 가져오기
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL 환경 변수를 설정하세요!");
    }

    // 쿠키 가져오기
    const cookies = document.cookie;
    const response = await fetch(`${baseUrl}/gatherings`, {
      method: "POST",
      body: formDataToSend,
      headers: {
        Cookie: cookies, // 쿠키 추가
      },
    });

    if (response.ok) {
      alert("모임이 성공적으로 생성되었습니다!");
      setIsOpen(false);
    } else {
      const errorData = await response.json();
      alert(`모임 생성 중 문제가 발생했습니다: ${errorData.message || "알 수 없는 오류"}`);
      // console.log("베이스 url", baseUrl);
      console.error("Error response:", errorData);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
  }
};

// 키워드 추가 핸들러 함수
export const handleKeywordAddition = (
  value: string,
  setFormData: Dispatch<SetStateAction<CreateGatheringFormData>>,
  setKeywordInput: Dispatch<SetStateAction<string>>,
) => {
  if (value.endsWith(" ") && value.startsWith("#")) {
    const newKeyword = value.trim().slice(1); // '#' 제거 후 공백 제거

    // 빈 키워드 방지: newKeyword가 공백 또는 빈 문자열이면 추가하지 않음
    if (newKeyword.length === 0) {
      setKeywordInput(""); // 입력 필드 초기화만 수행
      return;
    }
    setFormData(prev => ({
      ...prev,
      keywords: [...(prev.keywords || []), newKeyword],
    }));
    setKeywordInput(""); // 입력 필드 초기화
  }
};

// 입력값 업데이트 핸들러
export const handleKeywordChange = (
  value: string,
  setKeywordInput: Dispatch<SetStateAction<string>>,
) => {
  setKeywordInput(value);
};
