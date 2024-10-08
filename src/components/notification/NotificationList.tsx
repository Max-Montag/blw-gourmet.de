import React from "react";
import { useNotification } from "@/context/NotificationContext";
import "./notification-animation.css";

const NotificationList = () => {
  const { notifications } = useNotification();

  return (
    <>
      {notifications.map(({ id, message, type }, index) => {
        const typeClasses =
          type === "info"
            ? "bg-cyan-50 border-cyan-800 border text-cyan-950"
            : type === "warning"
              ? "bg-amber-500 border-amber-950 border text-white"
              : type === "error"
                ? "bg-rose-500 border-rose-950 border text-white"
                : "";

        return (
          <div
            key={id}
            className={`fixed top-[${(index + 2) * 64}px] left-0 w-full max-w-7-xl z-50 pointer-events-none animate-slide-in`}
          >
            <div
              className={`m-5 absolute rounded-xl font-semibold bg-opacity-95 p-4 shadow-sm ${typeClasses}`}
            >
              {message}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default NotificationList;
