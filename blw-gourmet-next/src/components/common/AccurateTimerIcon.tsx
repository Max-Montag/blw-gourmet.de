import React from "react";

interface AccurateTimerIconProps {
  timeInMinutes: number;
}

const AccurateTimerIcon: React.FC<AccurateTimerIconProps> = ({
  timeInMinutes,
}) => {
  const largeHandRotation = (timeInMinutes % 60) * 6;
  const hasSmallHand = timeInMinutes > 60;
  const smallHandRotation = hasSmallHand ? (timeInMinutes / 60) * 30 : 0;

  return (
    <div className="relative w-[48px] h-[48px] rounded-full border-4 border-cyan-700 bg-cyan-50 flex justify-center items-center m-4">
      <div className="absolute -top-[8px] w-[16px] h-[6px] bg-cyan-700 rounded-full"></div>
      <div
        className="absolute left-[19px] top-[2px] w-[2px] h-[18px] bg-cyan-800 origin-bottom rounded"
        style={{ transform: `rotate(${largeHandRotation}deg)` }}
      ></div>
      {hasSmallHand && (
        <div
          className="absolute left-[19px] top-[8px] w-[2px] h-[12px] bg-cyan-900 origin-bottom rounded"
          style={{ transform: `rotate(${smallHandRotation}deg)` }}
        ></div>
      )}
    </div>
  );
};

export default AccurateTimerIcon;
