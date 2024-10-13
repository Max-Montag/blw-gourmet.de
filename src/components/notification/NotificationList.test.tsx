import "@testing-library/jest-dom";
import React from "react";
import { render, screen, act } from "@testing-library/react";
import {
  NotificationProvider,
  useNotification,
} from "@/context/NotificationContext";

const TestNotificationComponent = () => {
  const { showNotification } = useNotification();

  return (
    <button
      onClick={() => showNotification("Test Notification", "info", 3000)}
      data-testid="trigger-notification"
    >
      Trigger Notification
    </button>
  );
};

describe("NotificationList Component", () => {
  jest.useFakeTimers();

  const setup = () => {
    return render(
      <NotificationProvider>
        <TestNotificationComponent />
      </NotificationProvider>
    );
  };

  it("renders NotificationList with no notifications initially", () => {
    setup();

    const notifications = screen.queryByText(/Test Notification/i);
    expect(notifications).toBeNull();
  });

  it("displays a notification when showNotification is called", () => {
    setup();

    const triggerButton = screen.getByTestId("trigger-notification");

    act(() => {
      triggerButton.click();
    });

    expect(screen.getByText("Test Notification")).toBeInTheDocument();
    const notificationElement = screen.getByText("Test Notification");
    expect(notificationElement).toHaveClass("bg-cyan-50");
  });

  it("removes the notification after the specified time", () => {
    setup();

    const triggerButton = screen.getByTestId("trigger-notification");

    act(() => {
      triggerButton.click();
    });

    expect(screen.getByText("Test Notification")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText("Test Notification")).toBeNull();
  });

  it("displays multiple notifications correctly", () => {
    setup();

    const triggerButton = screen.getByTestId("trigger-notification");

    act(() => {
      triggerButton.click();
      triggerButton.click();
    });

    const notifications = screen.getAllByText("Test Notification");
    expect(notifications.length).toBe(2);
  });

  it("applies correct classes based on notification type", () => {
    render(
      <NotificationProvider>
        <TestNotificationComponent />
      </NotificationProvider>
    );

    const triggerButton = screen.getByTestId("trigger-notification");

    act(() => {
      triggerButton.click();
    });

    const notificationElement = screen.getByText("Test Notification");

    expect(notificationElement).toHaveClass("bg-cyan-50");
  });
});
