// import Image from "next/image";
// import { Map } from "react-kakao-maps-sdk"
// import useKakaoLoader from "./useKakaoLoader"

// type MapProps = {
//   address: string;
// };

// export default function Map({ address }: MapProps) {
//   return (
//     <div className="h-full">
//       <div className="aspect-square rounded-2xl bg-gray-500 tablet:aspect-auto tablet:h-[180px]">
//       <Map // 지도를 표시할 Container
//       id="map"
//       center={{
//         // 지도의 중심좌표
//         lat: 33.450701,
//         lng: 126.570667,
//       }}
//       style={{
//         // 지도의 크기
//         width: "100%",
//         height: "350px",
//       }}
//       level={3} // 지도의 확대 레벨
//     />
//       </div>
//       <div className="mt-2 flex items-center gap-1">
//         <div className="flex size-[18px] items-center justify-center">
//           <Image src="/images/detailPage/location.svg" alt="위치" width={12} height={16} />
//         </div>
//         <p className="text-sm font-medium text-[#3C3C3C]">{address}</p>
//       </div>
//     </div>
//   );
// }
