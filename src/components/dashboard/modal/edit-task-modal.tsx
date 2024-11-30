"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useEditTask } from "@/hooks/tasks/use-tasks";
import { motion } from "framer-motion";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
import { Priority, Status } from "@/types/tasks"; // Import enums for Priority and Status

// Validation schema for title, description, priority, and status
const validationSchema = z.object({
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

interface EditTaskModalProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    dueDate: string | Date; // Allow both string and Date types
  };
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onClose }) => {
  const editTaskMutation = useEditTask();

  const handleSubmit = (
    data: { title: string; description: string; dueDate: string | Date },
    reset: () => void
  ) => {
    const formattedDueDate =
      typeof data.dueDate === "string"
        ? new Date(data.dueDate).toISOString()
        : data.dueDate.toISOString();

    editTaskMutation.mutate(
      { taskId: task.id, ...data, dueDate: formattedDueDate },
      {
        onSuccess: () => {
          console.log("Task updated successfully");
          reset();
          onClose();
        },
        onError: (error) => {
          console.error("Failed to update task:", error);
        },
      }
    );
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <FormWrapper
            defaultValues={{
              title: task.title,
              description: task.description,
              priority: task.priority,
              status: task.status,
              dueDate: task.dueDate,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, control }) => (
              <div className="space-y-4">
                <FormFieldWrapper
                  name="title"
                  label="Title"
                  placeholder="Enter task title"
                  control={control}
                />
                <FormFieldWrapper
                  name="description"
                  label="Description"
                  placeholder="Enter task description"
                  control={control}
                  type="textarea"
                />
                <FormFieldWrapper
                  name="priority"
                  label="Priority"
                  control={control}
                  type="select"
                  options={[
                    { value: Priority.LOW, label: "Low" },
                    { value: Priority.MEDIUM, label: "Medium" },
                    { value: Priority.HIGH, label: "High" },
                  ]}
                />
                <FormFieldWrapper
                  name="status"
                  label="Status"
                  control={control}
                  type="select"
                  options={[
                    { value: Status.PENDING, label: "Pending" },
                    { value: Status.IN_PROGRESS, label: "In Progress" },
                    { value: Status.DONE, label: "Done" },
                  ]}
                />
                <FormFieldWrapper
                  name="dueDate"
                  label="Due Date"
                  control={control}
                  type="datetime-local"
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!isValid}>
                    Save
                  </Button>
                </div>
              </div>
            )}
          </FormWrapper>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
};

export default EditTaskModal;
