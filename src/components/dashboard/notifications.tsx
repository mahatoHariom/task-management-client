"use client";
import { markAllAsRead } from "@/store/slices/notification-slice";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const NotificationComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector(
    (state: RootState) => state.notifications
  );

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Notifications ({unreadCount})</h3>
        {unreadCount > 0 && (
          <button
            onClick={() => dispatch(markAllAsRead())}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {notifications.map((notification, index) => (
            <li
              key={`${notification.taskId}-${index}`}
              className={`text-sm p-2 rounded ${
                notification.read ? "bg-gray-700" : "bg-blue-900"
              }`}
            >
              <span className="font-medium">{notification.title}</span>
              <br />
              <span className="text-xs">
                Due: {new Date(notification.dueDate).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">No notifications</p>
      )}
    </div>
  );
};

export default NotificationComponent;
