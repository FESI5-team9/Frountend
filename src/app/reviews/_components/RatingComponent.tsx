import Progressbar from "@/components/Progressbar";
import { GetReviewStatsRes } from "@/types/api/reviews";

const mockData: GetReviewStatsRes = {
  averageScore: 4.0,
  oneStar: 0,
  twoStars: 0,
  threeStars: 2,
  fourStars: 19,
  fiveStars: 27,
};

function RatingComponent({ stats }: { stats?: GetReviewStatsRes }) {
  // eslint-disable-next-line no-console
  console.log(stats);

  const totalRatings = Object.values(mockData)
    .slice(1)
    .reduce((a, b) => a + b, 0);
  const starLabels = ["5점", "4점", "3점", "2점", "1점"];
  const starKeys: Array<keyof GetReviewStatsRes> = [
    "fiveStars",
    "fourStars",
    "threeStars",
    "twoStars",
    "oneStar",
  ];

  return (
    <div className="w-full max-w-md p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-3xl font-bold">{mockData.averageScore}</span>
        <span className="text-xl text-gray-400">/5</span>
        <div className="ml-2 flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-6 w-6 ${i < Math.floor(mockData.averageScore) ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {starLabels.map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-8 text-sm">{label}</span>
            <div className="flex-1">
              <Progressbar now={mockData[starKeys[index]]} max={totalRatings} />
            </div>
            <span className="w-8 text-right text-sm">{mockData[starKeys[index]]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingComponent;
