import { Priority } from "@/types/tasks";

export const getPriorityLabel = (priority: Priority) => {
  switch (priority) {
    case Priority.LOW:
      return "Low";
    case Priority.MEDIUM:
      return "Medium";
    case Priority.HIGH:
      return "High";
    default:
      return priority;
  }
};
