"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import Popup from "@/components/Popup";

type LoginAlertPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  text: string;
};

export default function LoginAlertPopup({ isOpen, onClose, text }: LoginAlertPopupProps) {
  const router = useRouter();

  return (
    <Popup
      className="flex min-w-[300px] flex-col items-center justify-center gap-7 px-11 py-10"
      isOpen={isOpen}
      onClose={onClose}
    >
      <p className="mt-3">{text}</p>
      <div className="flex w-full justify-center gap-4">
        <Button className="w-[120px] bg-[#dfe0e1]" onClick={onClose}>
          닫기
        </Button>
        <Button className="w-[120px]" bgColor="yellow" onClick={() => router.push("/signin")}>
          로그인
        </Button>
      </div>
    </Popup>
  );
}
