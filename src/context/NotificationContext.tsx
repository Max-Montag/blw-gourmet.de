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

  // TODO DELETE THIS
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const randomType = ["info", "warning", "error"][Math.floor(Math.random() * 3)];
  //     const randomMessage = `Random message ${Math.floor(Math.random() * 100)}`;
  //     // const randomId = Math.floor(Math.random() * 1000);
  //     console.log("Random notification", randomMessage, randomType);
  //     // notifications.push({ id: randomId, message: randomMessage, type: randomType });
  //     showNotification(randomMessage, randomType);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  const showNotification = (message: string, type = "info", time = 8000) => {
    const id = new Date().getTime() + Math.random();
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
