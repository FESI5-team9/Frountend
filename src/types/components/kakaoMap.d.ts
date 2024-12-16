export interface KakaoAddress {
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
    zip_code: string;
  };
  road_address?: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
  };
}

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: PostcodeData) => void;
        width?: string;
        height?: string;
      }) => {
        embed: (container: HTMLElement) => void;
      };
    };
    kakao?: {
      maps: KakaoMaps;
    };
  }
}

export interface PostcodeData {
  sido: string; // 시/도
  sigungu: string; // 구/군
  roadAddress: string; // 도로명 주소
  jibunAddress?: string; // 지번 주소
  zonecode?: string; // 우편번호
  location: string;
}
export {};

export interface KakaoMaps {
  Map: new (container: HTMLElement, options: MapOptions) => KakaoMap;
  Marker: new (options: MarkerOptions) => KakaoMarker;
  // 필요한 객체와 메서드를 추가로 정의
}

export interface MapOptions {
  center: LatLng; // 중심 좌표
  level: number; // 확대 레벨
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface KakaoMap {
  setCenter: (latlng: LatLng) => void;
  setLevel: (level: number) => void;
  // Kakao Map 메서드 추가
}

export interface MarkerOptions {
  position: LatLng; // 마커 좌표
}

export interface KakaoMarker {
  setPosition: (latlng: LatLng) => void;
  setMap: (map: KakaoMap | null) => void;
  // Kakao Marker 메서드 추가
}
