"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOJSKEY}&libraries=services&autoload=false`;

export default function KakaoMapLayout() {
  const [coordinates, setCoordinates] = useState({ lat: 33.450701, lng: 126.570667 });
  const address = "서울 광진구 능동로 110";
  const name = "하이디라오 건대점";

  useEffect(() => {
    const lat = 33.450701;
    const lng = 126.570667;

    setCoordinates({ lat, lng });
  }, [address]);

  const goToMap = () => {
    // window.open(`https://map.kakao.com/?q=${address}`);
    window.open(`https://map.kakao.com/link/to/${name}`);
  };

  return (
    <div className="h-full w-full">
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        id="map"
        center={coordinates}
        style={{ borderRadius: "1rem", width: "100%", height: "100%" }}
        onClick={goToMap}
      >
        <MapMarker position={coordinates} />
        <ZoomControl />
      </Map>
    </div>
  );
}
