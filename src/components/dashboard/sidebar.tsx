"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaBars, FaBell } from "react-icons/fa";
import { BiCollapse } from "react-icons/bi";
import { GoSidebarCollapse } from "react-icons/go";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { markAllAsRead } from "@/store/slices/notification-slice";
import AddTaskModal from "@/components/dashboard/modal/add-task-modal";
import { Button } from "../ui/button";

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("tasks");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // Get notifications from Redux store
  const { notifications, unreadCount } = useSelector(
    (state: RootState) => state.notifications
  );

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
    if (tab === "tasks") {
      router.push("/dashboard");
    }
  };

  const handleLogout = (): void => {
    Cookies.remove("accessToken");
    router.push("/login");
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleNotifications = (): void => {
    setIsNotificationOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative">
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{
            x: isSidebarOpen ? 0 : -300,
            opacity: isSidebarOpen ? 1 : 0,
          }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className={`w-64 h-full bg-background border-r border-border p-4 flex flex-col ${
            isSidebarOpen ? "" : "hidden"
          }`}
        >
          {/* Header with Notification Toggle */}
          <div className="flex justify-between items-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-semibold text-foreground"
            >
              Task Manager
            </motion.div>
            <div className="flex items-center space-x-2">
              {/* Notification Bell with Unread Count */}
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="text-2xl relative"
                >
                  <FaBell />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Sidebar Toggle */}
              <button onClick={toggleSidebar} className="text-2xl">
                {isSidebarOpen ? <BiCollapse /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Notifications Dropdown */}
          {isNotificationOpen && (
            <div className="absolute top-16 left-0 w-64 bg-background border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
              <div className="flex justify-between items-center p-3 border-b border-border">
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
                <ul className="space-y-2 p-2">
                  {notifications.map((notification, index) => (
                    <li
                      key={`${notification.taskId}-${index}`}
                      className={`text-sm p-2 rounded ${
                        notification.read ? "bg-gray-100" : "bg-blue-50"
                      }`}
                    >
                      <span className="font-medium">{notification.title}</span>
                      <br />
                      <span className="text-xs text-gray-500">
                        Due:{" "}
                        {new Date(notification.dueDate).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 p-3">No notifications</p>
              )}
            </div>
          )}

          {/* Navigation links */}
          <ul className="flex flex-col space-y-2 mt-4">
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={() => handleTabClick("tasks")}
                className="w-full flex justify-start"
                variant={activeTab === "tasks" ? "default" : "outline"}
              >
                Tasks
              </Button>
            </motion.li>

            {/* Add Task Button */}
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AddTaskModal />
            </motion.li>
          </ul>

          {/* Logout button */}
          <motion.div
            className="mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleLogout}
              className="w-full p-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/80 mt-4 flex items-center justify-start space-x-2 focus:outline-none"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </motion.div>
        </motion.aside>
      </div>

      {/* Sidebar Open Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute bottom-8 left-8 p-4 rounded-full bg-primary text-white shadow-md ${
          !isSidebarOpen ? "block animate-pulse" : "hidden"
        }`}
      >
        <GoSidebarCollapse className="text-2xl" />
      </button>
    </>
  );
};

export default Sidebar;
