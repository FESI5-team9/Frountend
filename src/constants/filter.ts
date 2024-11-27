export const LOCATION_OPTIONS: string[] = [
  "지역 선택",
  "서울시",
  "경기도",
  "전라도",
  "경상도",
  "강원도",
  "충청도",
  "제주도",
];

export const SORT_OPTIONS: string[] = ["최신순", "마감 임박순", "참여 인원순"];

export const OPTIONS_MAP: Record<string, string[]> = {
  location: LOCATION_OPTIONS,
  sort: SORT_OPTIONS,
};
