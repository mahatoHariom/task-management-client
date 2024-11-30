/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

export const useWebSocket = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:9000");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "overdue-task") {
        setNotifications((prev) => [...prev, data]); // Add new notifications to the list
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setWs(socket);

    return () => {
      socket.close(); // Cleanup on unmount
    };
  }, []);

  return { notifications, ws };
};
