// export interface Task {
//   priority: Priority;
//   id: string;
//   title: string;
//   description: string;
//   dueDate: string;
//   status: "pending" | "completed" | "overdue";
//   createdAt: string;
//   updatedAt: string;
// }

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | string;
  status: Status;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  taskId: string;
  title: string;
  dueDate: string;
  type: "overdue-task" | "task-update";
  read: boolean;
  createdAt: string;
}

// Enum for task status
export enum Status {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

// Enum for task priority
export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

// Interface for Tasks Response (for pagination)
export interface TasksResponse {
  tasks: Task[];
  currentPage: number;
  totalPages: number;
  totalTasks: number;
}

export interface TaskTableProps {
  tasks: Task[];
  isLoading?: boolean;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
}

export interface UpdateTaskInput {
  taskId: string;
  title: string;
  description?: string;
  priority?: Priority;
  status?: Status;
  dueDate?: string; // Add dueDate as an optional string field
}
