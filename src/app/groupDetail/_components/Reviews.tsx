import Image from "next/image";
import { formatToKoreanTime } from "@/utils/date";

type ReviewType = {
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  user: {
    nickname: string;
    image: string;
  };
};

type ReviewProp = {
  reviews: ReviewType[];
};

export default function Reviews({ reviews }: ReviewProp) {
  return (
    <div className="border-t border-[#e5e7eb] bg-white p-6 pb-[134px] tablet:col-span-2 tablet:pb-[87px]">
      <div className="h-[500px]">
        <h3 className="mb-5 text-lg font-semibold">
          리뷰 <span>({reviews.length})</span>
        </h3>
        <div className="flex flex-col gap-[10px]">
          {reviews.map(review => (
            <div key={review.id} className="border-b-2 border-dashed border-[#F3F4F6] pb-4">
              <div className="flex h-[86px] flex-col justify-between">
                <div className="flex">
                  {Array.from({ length: review.score }).map((_, index) => (
                    <div key={index} className="flex h-6 w-6 items-center justify-center">
                      <Image width={20} height={18} alt="평점" src="/images/filled_heart.svg" />
                    </div>
                  ))}
                  {Array.from({ length: 5 - review.score }).map((_, index) => (
                    <div key={index} className="flex h-6 w-6 items-center justify-center">
                      <Image width={20} height={18} alt="평점" src="/images/grey_heart.svg" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium">{review.comment}</p>
                <div className="flex items-center gap-1 text-xs font-medium">
                  <div className="flex items-center gap-1">
                    <div className="h-6 w-6 rounded-full bg-gray-400"></div>
                    <span>{review.user.nickname}</span>
                  </div>
                  <span className="text-[#3C3C3C]">|</span>

                  <span className="text-[#9CA3AF]">
                    {formatToKoreanTime(review?.createdAt, "yyyy.MM.dd")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-[476px]">1 2 3 4 5 ...</div>
    </div>
  );
}
