import React from "react";
import Navbar from "@/components/dashboard/navbar";
// import NotificationComponent from "@/components/dashboard/notifications";
import Sidebar from "@/components/dashboard/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4">{children}</main>
      </div>
      {/* <NotificationComponent /> */}
    </div>
  );
};

export default DashboardLayout;
