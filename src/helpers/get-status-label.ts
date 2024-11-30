import { Status } from "@/types/tasks";

// Function to map status to readable format
export const getStatusLabel = (status: Status) => {
  switch (status) {
    case Status.PENDING:
      return "Pending";
    case Status.IN_PROGRESS:
      return "In Progress";
    case Status.DONE:
      return "Done";
    default:
      return status;
  }
};
