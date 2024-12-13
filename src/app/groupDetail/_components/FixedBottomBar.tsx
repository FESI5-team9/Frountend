import Button from "@/components/Button/Button";

type FixedBottomBarProps = {
  status: "join" | "cancelJoin" | "closed" | "host";
  onJoin: () => Promise<void>;
  onLeave: () => Promise<void>;
  onCancel: () => Promise<void>;
};

export default function FixedBottomBar({ status, onJoin, onLeave, onCancel }: FixedBottomBarProps) {
  const handleShare = async () => {
    // 모임 공유하기
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

        {/* 상태에 따라 버튼 표시 */}
        {status === "join" && (
          <Button
            className="h-11 w-[115px] bg-yellow-primary text-[#262626] tablet:grow-0"
            onClick={onJoin}
          >
            참여하기
          </Button>
        )}

        {status === "cancelJoin" && (
          <Button
            className="h-11 w-[115px] bg-[#ff9e48] !p-[10px] text-white tablet:grow-0"
            onClick={onLeave}
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
              onClick={onCancel}
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
    </div>
  );
}
