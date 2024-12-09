"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOJSKEY}&libraries=services&autoload=false`;

export default function KakaoMapLayout() {
  const [coordinates, setCoordinates] = useState({ lat: 33.450701, lng: 126.570667 });
  const address = "제주특별자치도 제주시 첨단로 242";

  useEffect(() => {
    const lat = 3;
    const lng = 4;

    setCoordinates({ lat, lng });
  }, [address]);

  return (
    <div className="h-full w-full">
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map center={coordinates} style={{ width: "100%", height: "100%" }}>
        <MapMarker position={coordinates}>
          <div style={{ color: "#000" }}>{address}</div>
        </MapMarker>
      </Map>
    </div>
  );
}
