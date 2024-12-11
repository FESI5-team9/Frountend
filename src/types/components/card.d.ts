// export interface CardType {
//   address1: string;
//   canceledAt: null;
//   capacity: number;
//   createdBy: string;
//   dateTime: string;
//   id: number;
//   image?: string;
//   location: string;
//   name: string;
//   participantCount: number;
//   registrationEnd: string;
//   type: string;
// }

export interface GetGathering {
  id: number;
  type: "CAFE" | "RESTAURANT" | "PUB" | "VEGAN";
  name: string;
  dateTime: string;
  registrationEnd: string;
  location?:
  | "SEOUL"
  | "GYEONGGI_DO"
  | "GANGWON_DO"
  | "CHUNGCHEONG_DO"
  | "GYEONGSANG_DO"
  | "JEOLLA_DO"
  | "JEJU_ISLAND";
  address1: string;
  address2: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdAt: string;
  canceledAt: string;
}
