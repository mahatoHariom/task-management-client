/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { WebSocketNotificationClient } from "@/components/notification-service";
import { Notification } from "@/types/notification";
import { triggerBrowserNotification } from "./trigger-new";

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationClient, setNotificationClient] =
    useState<WebSocketNotificationClient | null>(null);

  useEffect(() => {
    if (userId) {
      const client = new WebSocketNotificationClient(userId);
      setNotificationClient(client);

      return () => {
        client.disconnect();
      };
    }
  }, [userId]);

  useEffect(() => {
    if (!notificationClient) return;

    const removeListener = notificationClient.addNotificationListener(
      (notification: any) => {
        setNotifications((prev) => [notification, ...prev]);
        triggerBrowserNotification(notification);
      }
    );

    return removeListener;
  }, [notificationClient]);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    markAsRead,
    clearNotifications,
  };
};
