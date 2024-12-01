import { Notification as NotiType } from "@/types/notification";
export const triggerBrowserNotification = (notification: NotiType) => {
  if (!("Notification" in window)) {
    console.warn("Browser notifications not supported");
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
    return;
  }

  const options: NotificationOptions = {
    body: notification.message,
    icon: "/path/to/icon.png",
    tag: notification.id,
  };

  new Notification(notification.title, options);
};
