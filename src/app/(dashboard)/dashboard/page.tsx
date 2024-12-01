"use client";
import React from "react";
import TaskTable from "@/components/dashboard/task-table";
// import { NotificationCenter } from "@/components/notification-center";
// import { useNotifications } from "@/hooks/user-notifications";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";

const DashboardPage: React.FC = () => {
  // const { id: userId } = useSelector((state: RootState) => state.user);
  // const { notifications, markAsRead, clearNotifications } =
  //   useNotifications(userId);
  return (
    <>
      {/* <NotificationCenter
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onClear={clearNotifications}
      /> */}
      <TaskTable />
    </>
  );
};

export default DashboardPage;
