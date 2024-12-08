import Image from "next/image";
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
    <div className="border-y-2">
      <div className="mx-auto flex w-full max-w-[610px] items-center justify-between px-6 py-8">
        <div className="flex h-[60px] w-[148px] flex-col items-center justify-center gap-2 py-7 pr-5">
          <div className="text-xl font-bold">
            <span>{mockData.averageScore.toFixed(1)} </span>
            <span className="text-gray-400">/5</span>
          </div>
          <div className="flex w-[120px]">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                src={
                  i < Math.floor(mockData.averageScore)
                    ? "/icons/heart.svg"
                    : "/icons/empty_heart.svg"
                }
                alt={i < Math.floor(mockData.averageScore) ? "가득찬 하트" : "빈하트"}
                width={24}
                height={24}
              />
            ))}
          </div>
        </div>

        <div className="flex w-full max-w-[294px] flex-col gap-1">
          {starLabels.map((label, index) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <span>{label}</span>
              <div className="flex-1">
                <Progressbar now={mockData[starKeys[index]]} max={totalRatings} />
              </div>
              <span className="text-gray-400">{mockData[starKeys[index]]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RatingComponent;
