import React from "react";
import Image from "next/image";
import "./loading-animation.css";

const LoadingAnimation: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="relative flex flex-col items-center">
        <div className="chef-hat absolute text-cyan-200">
          <Image
            src="/logo/animation-hat.svg"
            alt="Chef Hat will-change-transform"
            width={200}
            height={200}
            priority
          />
        </div>
        <Image
          src="/logo/animation-baby.svg"
          alt="Baby will-change-transform"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;
