"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CancelGathering, LeaveGathering, joinGathering } from "@/apis/assignGatheringApi";
import { getReviews } from "@/apis/reviewsApi";
import { getGatheringDetail } from "@/apis/searchGatheringApi";
import useUserStore from "@/store/userStore";
import { GatheringDetailRes, Participant } from "@/types/api/gatheringApi";
import { ReviewsRes } from "@/types/api/reviews";
import { formatToKoreanTime, getRemainingHours } from "@/utils/date";
import DetailCard from "../_components/DetailCard";
import FixedBottomBar from "../_components/FixedBottomBar";
import Map from "../_components/Map";
import Reviews from "../_components/Reviews";

function GroupDetailPage({ params }: { params: { id: string } }) {
  const [detail, setDetail] = useState<GatheringDetailRes>();
  const [reviews, setReviews] = useState<ReviewsRes>([]);
  const [status, setStatus] = useState<"join" | "cancelJoin" | "closed" | "host">("join");
  const userInfo = useUserStore();

  const checkParticipationStatus = useCallback(
    (participants: Participant[]) =>
      participants.some(participant => participant.userId === userInfo.id),
    [userInfo.id],
  );

  const determineStatus = useCallback(
    (data: GatheringDetailRes) => {
      if (data.host) setStatus("host");
      else if (data.status === "RECRUITING") {
        setStatus(checkParticipationStatus(data.participants) ? "cancelJoin" : "join");
      } else setStatus("closed");
    },
    [checkParticipationStatus],
  );

  const fetchDetailData = useCallback(async () => {
    if (!params.id) return;
    try {
      const data = await getGatheringDetail(Number(params.id));
      setDetail(data);
      determineStatus(data);
    } catch (error) {
      console.error("Failed to fetch gathering details:", error);
    }
  }, [params.id, determineStatus]);

  const fetchReviewData = useCallback(async () => {
    if (!params.id) return;
    try {
      const data = await getReviews({ gatheringId: Number(params.id) });
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  }, [params.id]);

  const handleJoin = useCallback(async () => {
    if (!params.id) return;
    try {
      await joinGathering(params.id);
      setStatus("cancelJoin");
    } catch (error) {
      console.error("Failed to join gathering:", error);
    }
  }, [params.id]);

  const handleLeave = useCallback(async () => {
    if (!params.id) return;
    try {
      await LeaveGathering(params.id);
      setStatus("join");
    } catch (error) {
      console.error("Failed to leave gathering:", error);
    }
  }, [params.id]);

  const handleCancel = useCallback(async () => {
    if (!params.id) return;
    try {
      await CancelGathering(params.id);
    } catch (error) {
      console.error("Failed to cancel gathering:", error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchDetailData();
    fetchReviewData();
  }, [fetchDetailData, fetchReviewData]);

  if (!detail)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>모임을 찾을 수 없습니다.</p>
      </div>
    );

  return (
    <div className="mx-auto max-w-[1200px] px-4 tablet:px-8 desktop:px-[62px]">
      <div
        className={`desktop:grid-areas-custom grid gap-6 py-4 tablet:gap-6 tablet:p-6 desktop:px-[62px]`}
      >
        <div
          style={{ backgroundImage: `url(${detail.image})` }}
          className="desktop:grid-area-topLeft relative min-h-[180px] rounded-3xl bg-slate-400 bg-cover bg-center bg-no-repeat tablet:min-h-[270px] desktop:mb-20"
        >
          {detail.registrationEnd && (
            <div className="absolute right-0 top-0 z-50 flex h-[32px] w-[123px] items-center justify-center gap-[8px] rounded-bl-3xl rounded-tr-3xl bg-yellow-primary">
              <Image src="/images/mainPage/alarm.svg" width={15} height={13} alt="남은 마감시간" />
              <p className="text-xs">{getRemainingHours(detail.registrationEnd)}</p>
            </div>
          )}
        </div>
        <div className="desktop:grid-area-topRight min-h-[240px] tablet:min-h-[270px]">
          <DetailCard gathering={detail} />
        </div>
        <div className="desktop:grid-area-bottom flex flex-col gap-4 px-1 tablet:col-span-2 tablet:px-6 desktop:-mt-6">
          <h3 className="text-lg font-semibold">모임 설명</h3>
          <p className="text-sm font-medium">{detail.description}</p>
          <div className="flex items-center gap-1 text-xs font-medium">
            <div className="flex items-center gap-1">
              <div className="h-6 w-6 rounded-full bg-gray-400">
                {detail.user.image && <Image src={detail.user.image} alt="작성자" />}
              </div>
              <span>{detail.user.nickname}</span>
            </div>
            <span className="text-[#3C3C3C]">|</span>
            <span className="text-[#9CA3AF]">
              {formatToKoreanTime(detail.createdAt, "yyyy.MM.dd")}
            </span>
          </div>
        </div>
        {detail.address2 && (
          <div className="desktop:grid-area-bottomRight tablet:col-span-2 tablet:h-[206px] tablet:px-6 desktop:px-0">
            <Map address={detail.address2} />
          </div>
        )}
      </div>
      <div className="w-full pb-[134px] tablet:px-6 desktop:px-[62px]">
        <Reviews reviews={reviews} />
      </div>
      <FixedBottomBar
        status={status}
        onJoin={handleJoin}
        onLeave={handleLeave}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default GroupDetailPage;
