"use client";

import { motion } from "framer-motion";

export default function Progressbar({ now, max }: { now: number; max: number }) {
  const percentage = (now / max) * 100; // 진행 퍼센트 계산
  return (
    <div className="h-6 w-full rounded-md bg-gray-300">
      <motion.div
        className="h-6 rounded-lg bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <div className="absolute left-0 top-0 flex h-6 w-full items-center justify-center text-sm font-bold text-white">
        {now}/{max}
      </div>
    </div>
  );
}
