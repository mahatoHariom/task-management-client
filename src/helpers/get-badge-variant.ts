import { Priority, Status } from "@/types/tasks";

export const getStatusBadge = (status: Status) => {
  switch (status) {
    case Status.PENDING:
      return "secondary";
    case Status.IN_PROGRESS:
      return "destructive";
    case Status.DONE:
      return "success";
    default:
      return "default";
  }
};

export const getPriorityBadge = (priority: Priority) => {
  switch (priority) {
    case Priority.LOW:
      return "outline";
    case Priority.MEDIUM:
      return "default";
    case Priority.HIGH:
      return "destructive";
    default:
      return "default";
  }
};
