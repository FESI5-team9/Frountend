import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

// 한국 시간으로 변환하는 함수.
export const formatToKoreanTime = (isoDate: string, dateString: string) => {
  // ISO 형식의 날짜를 Date 객체로 변환
  const date = parseISO(isoDate);

  // 한국 표준시 기준 포맷 (yyyy년 MM월 dd일 HH:mm:ss)
  // dateString 예시: "yyyy년 MM월 dd일 HH시 mm분"
  return format(date, dateString, { locale: ko });
};
