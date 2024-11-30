import { ColumnDef } from "@tanstack/react-table";
import { Priority, Status, Task } from "@/types/tasks";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { Badge } from "@/components/ui/badge";
import { getPriorityBadge, getStatusBadge } from "@/helpers/get-badge-variant";

export const getTaskColumns = (
  onEditTask?: (task: Task) => void,
  onDeleteTask?: (taskId: string) => void
): ColumnDef<Task>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as Status;
      return (
        <Badge variant={getStatusBadge(status)}>
          {status === Status.PENDING
            ? "Pending"
            : status === Status.IN_PROGRESS
            ? "In Progress"
            : "Done"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: (info) => {
      const priority = info.getValue() as Priority;
      return (
        <Badge variant={getPriorityBadge(priority)}>
          {priority === Priority.LOW
            ? "Low"
            : priority === Priority.MEDIUM
            ? "Medium"
            : "High"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => {
      const date = new Date(info.getValue() as string);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const task = row.original;
      const date = new Date(task.dueDate as string); // Type assertion to string
      return (
        <div>
          <input
            type="datetime-local"
            value={date.toISOString().slice(0, 16)} // Format for datetime-local
            onChange={(e) => {
              // Handle date change for editing the task's due date
              const newDueDate = new Date(e.target.value).toISOString();
              if (onEditTask) {
                onEditTask({ ...task, dueDate: newDueDate });
              }
            }}
            className="w-full px-2 py-1 rounded border border-gray-300"
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const task = row.original;
      return (
        <div className="flex space-x-2">
          {onEditTask && (
            <button
              onClick={() => onEditTask(task)}
              className="p-2 text-blue-500 hover:text-blue-700"
              aria-label="Edit Task"
            >
              <FaRegEdit />
            </button>
          )}
          {onDeleteTask && (
            <button
              onClick={() => onDeleteTask(task.id)}
              className="p-2 text-red-500 hover:text-red-700"
              aria-label="Delete Task"
            >
              <MdDelete />
            </button>
          )}
        </div>
      );
    },
  },
];
