/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/tasks";
import { useTasks, UseTasksFilters } from "@/hooks/tasks/use-tasks";
import { getTaskColumns } from "./tasks/get-tasks-columns";
import { TaskTableFilters } from "./tasks/tasks-table-filter";
import EditTaskModal from "./modal/edit-task-modal";
import DeleteTaskModal from "./modal/delete-task-modal";
import SkeletonTable from "../skeleton/table-skeleton";
import NoData from "../global/no-data-available";
import { useUrlParams } from "@/hooks/user-url-params";

const TaskTable: React.FC = () => {
  const { params, setParams } = useUrlParams();

  // const [filters, setFilters] = useState<UseTasksFilters>({});
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);
  const filters: { [key: string]: string | string[] | undefined } = {
    search: (params.search as string) || "",
    status: (params.status as string) || "",
    priority: (params.priority as string) || "",
  };
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    setFilters: updateTaskFilters,
  } = useTasks(filters);

  const tasks = useMemo(
    () => data?.pages.flatMap((page) => page.tasks) || [],
    [data]
  );

  const columns = useMemo(
    () =>
      getTaskColumns(
        (task) => setEditTask(task),
        (taskId) => {
          const taskToDelete = tasks.find((task) => task.id === taskId);
          if (taskToDelete) setDeleteTask(taskToDelete);
        }
      ),
    [tasks]
  );

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleFilterChange = (newFilters: UseTasksFilters) => {
    // Use Object.entries to filter out undefined values

    const urlParams = Object.fromEntries(
      Object.entries(newFilters).map(([key, value]) =>
        // Convert null to empty string for URL
        [key, value === null || value === undefined ? "" : value]
      )
    );

    // Update URL with new filters
    setParams(urlParams as { [key: string]: string });

    // Update task filters
    updateTaskFilters(newFilters);
  };

  return (
    <div>
      <TaskTableFilters filters={filters} onFilterChange={handleFilterChange} />

      {isLoading ? (
        <SkeletonTable /> // Use of  SkeletonTable for loading state
      ) : tasks.length === 0 ? (
        <NoData /> // Use of NoData component when no tasks available
      ) : (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-center mt-4 items-center">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
          loading={isLoading}
        >
          Load More
        </Button>
      </div>

      {/* Edit Task Modal */}
      {editTask && (
        <EditTaskModal task={editTask} onClose={() => setEditTask(null)} />
      )}

      {/* Delete Task Modal */}
      {deleteTask && (
        <DeleteTaskModal
          task={deleteTask}
          onClose={() => setDeleteTask(null)}
        />
      )}
    </div>
  );
};

export default TaskTable;
