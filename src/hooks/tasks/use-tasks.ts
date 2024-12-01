"use client";
import { useState } from "react";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { apiKeys } from "@/constants/apiKeys";
import { getTasks, getOverdueTasks } from "@/services/tasks";
import {
  AddTaskVariables,
  Priority,
  Status,
  Task,
  UpdateTaskInput,
} from "@/types/tasks";
import queryClient from "@/lib/query-client";
import api from "@/lib/axios-instance";

export interface UseTasksFilters {
  search?: string;
  status?: Status | undefined;
  priority?: Priority | undefined;
}

export const useTasks = (filters: UseTasksFilters = {}) => {
  const [localFilters, setLocalFilters] = useState<UseTasksFilters>(filters);

  const query = useInfiniteQuery({
    queryKey: [apiKeys.tasks, localFilters],
    queryFn: async ({ pageParam = 1 }) => {
      console.log("Fetching tasks with params:", {
        page: pageParam,
        limit: 10,
        search: localFilters.search,
        status: localFilters.status,
        priority: localFilters.priority,
      });
      const result = await getTasks(
        pageParam as number,
        10,
        localFilters.search,
        localFilters.status,
        localFilters.priority
      );
      console.log("Tasks result:", result);
      return result;
    },
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined,
    initialPageParam: 1,
  });

  const setFilters = (newFilters: UseTasksFilters) => {
    setLocalFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return {
    ...query,
    setFilters,
  };
};

export const useOverdueTasks = () => {
  return useQuery({
    queryKey: [apiKeys.overdueTasks],
    queryFn: getOverdueTasks,
  });
};

export const useEditTask = () => {
  return useMutation({
    mutationFn: async (updatedTask: UpdateTaskInput) => {
      const response = await api.put("/tasks", updatedTask);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.tasks],
      });
    },
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: async (taskId: string) => {
      const response = await api.delete("/tasks", {
        data: { taskId },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.tasks],
      });
    },
  });
};

export const useAddTask = () => {
  return useMutation({
    mutationFn: async (taskData: AddTaskVariables): Promise<Task> => {
      const response = await api.post("/tasks", taskData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.tasks],
      });
    },
    onError: (error) => {
      console.error("Failed to add task:", error);
    },
  });
};
