import React from "react";
import { Notification, NotificationType } from "@/types/notification";

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClear: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onClear,
}) => {
  const renderNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.CRUD:
        return "📝";
      case NotificationType.OVERDUE:
        return "⏰";
      default:
        return "🔔";
    }
  };

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button onClick={onClear}>Clear All</button>
      </div>
      <div className="notification-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification ${
              notification.isRead ? "read" : "unread"
            }`}
            onClick={() => onMarkAsRead(notification.id)}
          >
            <span className="notification-icon">
              {renderNotificationIcon(notification.type)}
            </span>
            <div className="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <small>{new Date(notification.timestamp).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
