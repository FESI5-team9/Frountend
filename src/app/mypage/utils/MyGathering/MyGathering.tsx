import MypageCard from "@/components/MypageCard/MypageCard";
import { GetMyJoinedGathering } from "@/types/api/gatheringApi";

interface RenderContentProps {
  activeTab: string;
  loading: boolean;
  error: string | null;
  gatherings: GetMyJoinedGathering[];
}

export const MyGathering = ({ activeTab, loading, error, gatherings }: RenderContentProps) => {
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  switch (activeTab) {
    case "gathering":
      if (gatherings.length === 0) {
        return <p>신청한 모임이 아직 없어요.</p>;
      }
      return gatherings.map((gathering: GetMyJoinedGathering, index) => (
        <div key={gathering.id}>
          <MypageCard
            key={gathering.id}
            name={gathering.name}
            location={gathering.location}
            address1={gathering.address1}
            dateTime={gathering.dateTime}
            image={gathering.image}
            participantCount={gathering.participantCount}
            capacity={gathering.capacity}
          />
          {/* 구분선 추가 (마지막 요소 제외) */}
          {index !== gatherings.length - 1 && (
            <div className="mb-6 mt-6 border-[2px] border-dashed border-gray-200"></div>
          )}
        </div>
      ));
    case "createdGathering":
      if (gatherings.length === 0) {
        return <p>아직 만든 모임이 없어요.</p>;
      }
      return gatherings.map((gathering: GetMyJoinedGathering) => (
        <MypageCard
          key={gathering.id}
          name={gathering.name}
          location={gathering.location}
          address1={gathering.address1}
          dateTime={gathering.dateTime}
          keywords={gathering.keywords}
          image={gathering.image}
          participantCount={gathering.participantCount}
          capacity={gathering.capacity}
        />
      ));
    default:
      return <p>유효하지 않은 탭입니다.</p>;
  }
};
