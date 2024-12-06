import MypageCard from "@/components/MypageCard";
import { User } from "@/types/api/authApi";
import { GetMyJoinedGatheringsRes } from "@/types/api/gatheringApi";

interface RenderContentProps {
  activeTab: string;
  loading: boolean;
  error: string | null;
  userProfile: User[];
  gatherings: GetMyJoinedGatheringsRes[];
}

export const renderContent = ({
  activeTab,
  loading,
  error,
  userProfile,
  gatherings,
}: RenderContentProps) => {
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  switch (activeTab) {
    case "reviews":
      if (userProfile.length === 0) {
        return <p>아직 작성 가능한 리뷰가 없어요.</p>;
      }
      break;
    case "gathering":
      if (gatherings.length === 0) {
        return <p>신청한 모임이 아직 없어요.</p>;
      }
      return gatherings.map((gathering: GetMyJoinedGatheringsRes) => (
        <MypageCard
          key={gathering.id}
          name={gathering.name}
          location={gathering.location}
          address1={gathering.address1}
          dateTime={gathering.dateTime}
          keywords={gathering.keywords || []}
          image={gathering.image}
          participantCount={gathering.participantCount}
          capacity={gathering.capacity}
        />
      ));
    case "createdGathering":
      if (gatherings.length === 0) {
        return <p>아직 만든 모임이 없어요.</p>;
      }
      return gatherings.map((gathering: GetMyJoinedGatheringsRes) => (
        <MypageCard
          key={gathering.id}
          name={gathering.name}
          location={gathering.location}
          address1={gathering.address1}
          dateTime={gathering.dateTime}
          keywords={gathering.keywords || []}
          image={gathering.image}
          participantCount={gathering.participantCount}
          capacity={gathering.capacity}
        />
      ));
    default:
      return <p>유효하지 않은 탭입니다.</p>;
  }
};
