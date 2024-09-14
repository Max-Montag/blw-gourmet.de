import React from "react";
import { PiBaby, PiChefHat } from "react-icons/pi";
import "./loading-animation.css";

const LoadingAnimation: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
  <div className="relative flex flex-col items-center">
    <div className="chef-hat text-cyan-200">
      <PiChefHat size={75} />
    </div>
    <PiBaby size={100} className="text-cyan-500" />
  </div>
</div>
  );
};

export default LoadingAnimation;
