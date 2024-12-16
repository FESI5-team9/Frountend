"use client";

import { useEffect } from "react";
import Image from "next/image";

type MapProps = {
  address: string;
};

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOJSKEY}&libraries=services&autoload=false`;

export default function Map({ address }: MapProps) {
  useEffect(() => {
    if (document.getElementById("kakao-sdk")) return;

    const script = document.createElement("script");
    script.id = "kakao-sdk";
    script.src = KAKAO_SDK_URL;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 지도
          level: 3,
        };

        if (!container) {
          console.error("지도를 표시할 container가 없습니다.");
          return;
        }

        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(parseFloat(result[0].y), parseFloat(result[0].x));

            new kakao.maps.Marker({
              map,
              position: coords,
            });

            map.setCenter(coords);
          } else {
            console.error("주소 변환 실패:", status);
          }
        });
      });
    };

    return () => {
      const scriptElement = document.getElementById("kakao-sdk");
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [address]);

  return (
    <div className="h-full w-full">
      <div className="h-[336px] w-full rounded-2xl bg-gray-100 tablet:h-[180px]">
        <div id="map" style={{ width: "100%", height: "100%", borderRadius: "16px" }} />
      </div>
      <div className="mt-2 flex items-center gap-1">
        <div className="flex size-[18px] items-center justify-center">
          <Image src="/images/detailPage/location.svg" alt="위치" width={12} height={16} />
        </div>
        <p className="text-sm font-medium text-[#3C3C3C]">{address}</p>
      </div>
    </div>
  );
}
