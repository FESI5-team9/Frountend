import SKCard from "./SKCard";
import SKFilterSection from "./SKFilterSection";
import SKSelectedType from "./SKSelectedType";

export default function SKGatheringPage() {
  return (
    <div className="skeleton-wrapper flex flex-col gap-4">
      <SKSelectedType />
      <SKFilterSection />
      {Array.from({ length: 4 }).map((_, index) => (
        <SKCard key={index} />
      ))}
    </div>
  );
}
