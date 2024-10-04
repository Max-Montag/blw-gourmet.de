import React, { useEffect } from "react";
import "./notification-animation.css";

interface NotificationProps {
  isShown: boolean;
  setIsShown: (shown: boolean) => void;
  type?: "info" | "warning" | "error";
  message: string;
  time?: number;
}

const Notification: React.FC<NotificationProps> = ({
  isShown,
  setIsShown,
  message,
  type = "info",
  time = 8000,
}) => {
  const typeClasses =
    type === "info"
      ? "bg-cyan-50 border-cyan-800 border text-cyan-950"
      : type === "warning"
        ? "bg-amber-500 border-amber-950 border text-white"
        : type === "error"
          ? "bg-rose-500 border-rose-950 border text-white"
          : "";

  useEffect(() => {
    if (isShown) {
      const timer = setTimeout(() => {
        setIsShown(false);
      }, time);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isShown, setIsShown]);

  return (
    <>
      {isShown && (
        <div className="fixed -inset-4 top-0 w-full max-w-7-xl z-50 pointer-events-none">
          {" "}
          {/**  TODO inset-4 */}
          <div
            className={`absolute rounded-xl font-semibold bg-opacity-95 p-4 shadow-sm animate-slide-in top-[var(--header-height)] mt-5 left-[5%] w-[90%] md:w-[25%] md:left-[70%] ${typeClasses}`}
            onTouchMove={() => setIsShown(false)}
          >
            {message}
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
