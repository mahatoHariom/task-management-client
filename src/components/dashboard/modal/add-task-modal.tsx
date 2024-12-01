"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAddTask } from "@/hooks/tasks/use-tasks";
import { motion } from "framer-motion";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
import { Priority, Status } from "@/types/tasks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { validationSchema } from "@/schemas/tasks/add-tasks-schema";
import { MdAdd } from "react-icons/md";

const AddTaskModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: addTaskMutation, isPending } = useAddTask();
  const userId = useSelector((state: RootState) => state.user.id);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const handleSubmit = (
    data: {
      title: string;
      description: string;
      priority: Priority;
      status: Status;
      dueDate: string | Date;
    },
    reset: () => void
  ) => {
    const formattedDueDate =
      typeof data.dueDate === "string"
        ? new Date(data.dueDate).toISOString()
        : data.dueDate.toISOString();

    addTaskMutation(
      { ...data, dueDate: formattedDueDate, userId },
      {
        onSuccess: () => {
          reset();
          toggleModal();
        },
        onError: (error) => {
          console.error("Failed to add task:", error);
        },
      }
    );
  };

  return (
    <>
      <Button
        onClick={toggleModal}
        className="w-full text-start items-center flex justify-start "
        variant={"secondary"}
      >
        <MdAdd size={25} /> Add Task
      </Button>
      <Dialog open={isOpen} onOpenChange={toggleModal}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <FormWrapper
              defaultValues={{
                title: "",
                description: "",
                priority: Priority.LOW,
                status: Status.PENDING,
                dueDate: new Date().toISOString().slice(0, 16), // Format to YYYY-MM-DDTHH:mm
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
                    <Button variant="secondary" onClick={toggleModal}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isValid || isPending}
                      loading={isPending}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </FormWrapper>
          </DialogContent>
        </motion.div>
      </Dialog>
    </>
  );
};

export default AddTaskModal;
