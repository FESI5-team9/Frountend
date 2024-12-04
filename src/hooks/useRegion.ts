import { DistrictName, RegionName } from "@/types/hooks/region";

export const REGION_STRUCTURE: Record<RegionName, DistrictName[]> = {
  SEOUL: ["서울"],
  GYEONGGI_DO: ["경기", "인천"],
  GANGWON_DO: ["강원"],
  CHUNGCHEONG_DO: ["충북", "충남", "대전", "세종"],
  GYEONGSANG_DO: ["경북", "경남", "대구", "부산", "울산"],
  JEOLLA_DO: ["전북", "전남", "광주"],
  JEJU_ISLAND: ["제주특별자치도"],
};

export const getRegionMapping = (selectedRegion: DistrictName): RegionName => {
  for (const [region, districts] of Object.entries(REGION_STRUCTURE)) {
    if (districts.includes(selectedRegion as DistrictName)) {
      return region as RegionName;
    }
  }
  return selectedRegion as RegionName;
};
