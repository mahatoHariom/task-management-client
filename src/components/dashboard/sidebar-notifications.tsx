"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import { Notification as NotiType } from "@/types/notification";
import { useNotifications } from "@/hooks/user-notifications";

interface NotificationSidebarProps {
  userId: string;
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({
  userId,
}) => {
  const { notifications, markAsRead, clearNotifications } =
    useNotifications(userId);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotifications = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const unreadCount = notifications.filter(
    (notification: NotiType) => !notification.isRead
  ).length;

  return (
    <div className="relative">
      <button onClick={toggleNotifications} className="relative text-2xl ">
        <FaBell size={15} />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isNotificationOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-12 -right-20 w-64 bg-white text-black border rounded-md shadow-lg max-h-80 overflow-y-auto z-50"
        >
          <div className="flex justify-between items-center p-3 border-b bg-gray-100">
            <h3 className="font-bold">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={() => {
                  notifications.forEach((notification) => {
                    if (!notification.isRead) {
                      markAsRead(notification.id);
                    }
                  });
                }}
                className="text-sm text-blue-500"
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications?.length > 0 ? (
            <ul className="p-3 space-y-2">
              {notifications.map((notification: NotiType) => (
                <li
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-3 rounded cursor-pointer transition duration-200 ease-in-out hover:bg-gray-100 ${
                    notification.isRead ? "bg-white" : "bg-blue-200"
                  }`}
                >
                  <h4 className="font-medium text-lg text-black">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-800">
                    {notification.message}
                  </p>
                  <small className="text-gray-500">
                    Due:{" "}
                    {new Date(
                      notification?.dueDate as string
                    ).toLocaleDateString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-3 text-gray-400">No notifications</p>
          )}

          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="w-full p-2 text-sm text-red-500 border-t bg-gray-100"
            >
              Clear All
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default NotificationSidebar;
