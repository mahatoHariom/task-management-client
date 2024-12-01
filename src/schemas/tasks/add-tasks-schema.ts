import { Priority, Status } from "@/types/tasks";
import { z } from "zod";

export const validationSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
  priority: z.enum([Priority.LOW, Priority.MEDIUM, Priority.HIGH], {
    required_error: "Priority is required",
  }),
  status: z.enum([Status.PENDING, Status.IN_PROGRESS, Status.DONE], {
    required_error: "Status is required",
  }),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid due date",
  }),
});
