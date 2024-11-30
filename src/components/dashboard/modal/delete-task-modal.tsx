"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteTask } from "@/hooks/tasks/use-tasks";
import { motion } from "framer-motion";

interface DeleteTaskModalProps {
  task: { id: string; title: string };
  onClose: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ task, onClose }) => {
  const deleteTaskMutation = useDeleteTask();

  const handleDelete = () => {
    deleteTaskMutation.mutate(task.id, {
      onSuccess: () => {
        console.log("Task deleted successfully");
        onClose();
      },
      onError: (error) => {
        console.error("Failed to delete task:", error);
      },
    });
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
            <DialogTitle>Delete Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Are you sure you want to delete <strong>{task.title}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
};

export default DeleteTaskModal;
