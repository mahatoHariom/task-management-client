"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { GoSidebarCollapse } from "react-icons/go";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
import AddTaskModal from "@/components/dashboard/modal/add-task-modal";
import { Button } from "../ui/button";
import NotificationSidebar from "./sidebar-notifications";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("tasks");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const router = useRouter();
  const { id: userId } = useSelector((state: RootState) => state.user);

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
          <div className="flex justify-between items-center mb-6 ">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-semibold text-foreground"
            >
              Task Manager
            </motion.div>
            <div className="flex items-center  gap-4">
              {/* Notification Sidebar */}
              <NotificationSidebar userId={userId} />

              {/* Sidebar Toggle */}
              <button onClick={toggleSidebar} className="">
                {isSidebarOpen ? <GoSidebarCollapse size={20} /> : <FaBars />}
              </button>
            </div>
          </div>

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
