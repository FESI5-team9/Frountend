"use client";

import { useCallback, useEffect, useState } from "react";
import { CancelGathering, LeaveGathering, joinGathering } from "@/apis/assignGatheringApi";
import Button from "@/components/Button/Button";
import useUserStore from "@/store/userStore";
import { GatheringDetailRes, Participant } from "@/types/api/gatheringApi";
import LoginAlertPopup from "./LoginAlertPopup";

type FixedBottomBarProps = {
  data: GatheringDetailRes;
  gatheringId: string;
};

export default function FixedBottomBar({ data, gatheringId }: FixedBottomBarProps) {
  const [status, setStatus] = useState<"join" | "cancelJoin" | "closed" | "host">("join");
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState<boolean>(false);

  const userInfo = useUserStore();

  const checkParticipationStatus = useCallback(
    (participants: Participant[]) =>
      participants.some(participant => participant.userId === userInfo.id),
    [userInfo.id],
  );

  const determineStatus = useCallback(() => {
    if (data.host) setStatus("host");
    else if (data.status === "RECRUITING") {
      setStatus(checkParticipationStatus(data.participants) ? "cancelJoin" : "join");
    } else setStatus("closed");
  }, [checkParticipationStatus, data]);

  useEffect(() => {
    determineStatus();
  }, [data, determineStatus]);

  const handleJoin = async () => {
    if (!userInfo.id) return setIsLoginAlertOpen(true);

    try {
      await joinGathering(gatheringId);
      setStatus("cancelJoin");
    } catch (err) {
      console.error("Failed to join gathering:", err);
    }
  };

  const handleLeave = async () => {
    try {
      await LeaveGathering(gatheringId);
      setStatus("join");
    } catch (err) {
      console.error("Failed to leave gathering:", err);
    }
  };

  const handleCancel = async () => {
    try {
      await CancelGathering(gatheringId);
    } catch (err) {
      console.error("Failed to cancel gathering:", err);
    }
  };

  const handleShare = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert("URL이 클립보드에 복사되었습니다!");
    } catch (error) {
      console.error("URL 복사 실패", error);
      alert("URL 복사 실패");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 z-[999] max-h-[134px] w-full border-t-2 bg-white tablet:h-[84px] desktop:h-[87px]">
      <div
        className={`mx-auto flex max-w-[744px] ${status === "host" ? "flex-wrap" : "flex-nowrap"} items-center justify-between gap-[14px] px-4 py-5 tablet:px-6 tablet:py-5 desktop:px-12`}
      >
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">메이트들의 PICK! &#127828;</p>
          {status === "host" ? (
            <p className="text-xs">메이트들이 선택한 맛집에서 즐거운 한끼 어떠세요? </p>
          ) : (
            <div className="flex-none tablet:flex">
              <p className="text-xs">메이트들이 선택한 맛집에서&nbsp;</p>
              <p className="text-xs">즐거운 한끼 어떠세요?</p>
            </div>
          )}
        </div>

        {status === "join" && (
          <Button
            className="h-11 w-[115px] bg-yellow-primary text-[#262626] tablet:grow-0"
            onClick={handleJoin}
          >
            참여하기
          </Button>
        )}

        {status === "cancelJoin" && (
          <Button
            className="h-11 w-[115px] bg-[#ff9e48] !p-[10px] text-white tablet:grow-0"
            onClick={handleLeave}
          >
            참여 취소하기
          </Button>
        )}

        {status === "closed" && (
          <Button className="h-11 w-[115px] bg-[#9CA3AF] text-white tablet:grow-0" disabled>
            참여 마감
          </Button>
        )}

        {status === "host" && (
          <div className="flex w-full gap-2 tablet:w-[238px]">
            <Button
              className="h-11 w-[115px] grow bg-[#E5E7EB] text-[#262626] tablet:w-[115px] tablet:grow-0"
              onClick={handleCancel}
            >
              취소하기
            </Button>
            <Button
              className="h-11 w-[115px] grow bg-yellow-primary text-[#262626] tablet:w-[115px] tablet:grow-0"
              onClick={handleShare}
            >
              공유하기
            </Button>
          </div>
        )}
      </div>
      <LoginAlertPopup
        text="참여하기는 로그인이 필요합니다."
        isOpen={isLoginAlertOpen}
        onClose={() => setIsLoginAlertOpen(false)}
      />
    </div>
  );
}
