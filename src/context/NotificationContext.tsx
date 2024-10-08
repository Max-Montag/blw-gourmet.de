import React, { createContext, useContext, useState } from "react";
import NotificationList from "@/components/notification/NotificationList";
import { Notification } from "@/types/notificationTypes";

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (message: string, type?: string, time?: number) => void;
}

const defaultContextValue: NotificationContextType = {
  notifications: [],
  showNotification: () => {},
};

const NotificationContext =
  createContext<NotificationContextType>(defaultContextValue);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (message: string, type = "info", time = 8000) => {
    const id = new Date().getTime();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id),
      );
    }, time);
  };

  return (
    <NotificationContext.Provider value={{ notifications, showNotification }}>
      {children}
      <NotificationList />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
