import React from "react";
import { IoWarningOutline } from "react-icons/io5";

interface WarningNotificationProps {
  message: string;
}

const WarningNotification: React.FC<WarningNotificationProps> = ({
  message,
}) => {
  return (
    <div className="flex items-center p-4 my-4 text-sm text-amber-700 bg-amber-100 rounded-lg border border-amber-400">
      <IoWarningOutline className="flex-shrink-0 inline w-5 h-5 mr-3 text-amber-500" />
      <span>{message}</span>
    </div>
  );
};

export default WarningNotification;
