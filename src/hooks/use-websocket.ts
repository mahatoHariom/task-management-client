import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useQueryClient } from "@tanstack/react-query";
import { apiKeys } from "@/constants/apiKeys";
import {
  addNotification,
  setWebSocketConnected,
} from "@/store/slices/notification-slice";
import { updateTask } from "@/store/slices/task-slice";

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:9000/ws");

    socket.onopen = () => {
      dispatch(setWebSocketConnected(true));
    };

    socket.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === "overdue-task") {
          // Add notification to Redux store
          dispatch(
            addNotification({
              taskId: data.data.taskId,
              title: data.data.title,
              dueDate: data.data.dueDate,
              type: "overdue-task",
              read: false,
              createdAt: new Date().toISOString(),
            })
          );

          // Update task in Redux store
          dispatch(
            updateTask({
              ...data.data,
              status: "overdue",
            })
          );

          // Invalidate relevant queries
          await queryClient.invalidateQueries({
            queryKey: [apiKeys.tasks],
          });
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket encountered an error:", error);
    };

    socket.onclose = () => {
      dispatch(setWebSocketConnected(false));
    };

    return () => socket.close();
  }, [dispatch, queryClient]);
};
