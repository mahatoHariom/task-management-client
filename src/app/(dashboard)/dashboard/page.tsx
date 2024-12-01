"use client";
import React from "react";
import TaskTable from "@/components/dashboard/task-table";
import { NotificationCenter } from "@/components/notification-center";
import { useNotifications } from "@/hooks/user-notifications";

const DashboardPage: React.FC = () => {
  const { notifications, markAsRead, clearNotifications } = useNotifications(
    "cm44c2mhw0000jlrz6ma5yob9"
  );
  return (
    <>
      {/* <WebSocketComponent /> */}
      {/* <NotificationComponent /> */}
      <NotificationCenter
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onClear={clearNotifications}
      />
      <TaskTable />
    </>
  );
};

export default DashboardPage;
