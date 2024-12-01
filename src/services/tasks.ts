import api from "@/lib/axios-instance";
import { Priority, Status, Task } from "@/types/tasks";

export const getOverdueTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks/overdue");
  return response.data;
};

export const getTasks = async (
  page = 1,
  limit = 10,
  search = "",
  status?: Status,
  priority?: Priority
) => {
  try {
    const response = await api.get("/tasks", {
      params: {
        page,
        limit,
        search,
        status,
        priority,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};
