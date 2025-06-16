import { ChallengeTimerProps } from "@/interfaces/Challenge/ChallengeTimerProps";
import { formatTime } from "@/utils/utils";
import React from "react";
import { FiClock } from "react-icons/fi";

const ChallengeTimer: React.FC<ChallengeTimerProps> = ({
  isChallengeStarted,
  timeRemaining,
  timeLimit,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 text-2xl font-mono bg-white p-4 rounded-lg shadow-md">
      <FiClock className="text-theme-color-primary" />
      <span className="font-bold">
        {isChallengeStarted ? formatTime(timeRemaining) : formatTime(timeLimit)}
      </span>
    </div>
  );
};

export default ChallengeTimer;