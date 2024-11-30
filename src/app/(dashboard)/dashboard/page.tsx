import Navbar from "@/components/dashboard/navbar";
import NotificationComponent from "@/components/dashboard/notifications";
import Sidebar from "@/components/dashboard/sidebar";
import TaskTable from "@/components/dashboard/task-table";

import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4">
          <TaskTable />
        </main>
      </div>
      <NotificationComponent />
    </div>
  );
};

export default DashboardPage;
