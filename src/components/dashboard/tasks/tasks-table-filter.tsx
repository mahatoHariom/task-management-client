"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Priority, Status } from "@/types/tasks";
import { UseTasksFilters } from "@/hooks/tasks/use-tasks";

interface TaskTableFiltersProps {
  filters: UseTasksFilters;
  onFilterChange: (filters: UseTasksFilters) => void;
}

export const TaskTableFilters: React.FC<TaskTableFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="flex space-x-4 mb-4">
      {/* Global Search */}
      <div className="relative flex justify-evenly">
        <Input
          placeholder="Search tasks..."
          value={filters.search || ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              search: e.target.value || undefined,
            })
          }
          className="max-w-sm"
        />
        {filters.search && (
          <button
            onClick={() => onFilterChange({ ...filters, search: undefined })}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            x
          </button>
        )}
      </div>

      {/* Status Filter */}
      <Select
        value={filters.status || "ALL"}
        onValueChange={(value) =>
          onFilterChange({
            ...filters,
            status: value === "ALL" ? undefined : (value as Status),
          })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Status</SelectItem>
          {Object.values(Status).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
          <SelectItem
            value="CLEAR"
            className="text-red-500 focus:bg-red-50"
            onSelect={() =>
              onFilterChange({
                ...filters,
                status: undefined,
              })
            }
          >
            Clear Status
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Priority Filter */}
      <Select
        value={filters.priority || "ALL"}
        onValueChange={(value) =>
          onFilterChange({
            ...filters,
            priority: value === "ALL" ? undefined : (value as Priority),
          })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Priority</SelectItem>
          {Object.values(Priority).map((priority) => (
            <SelectItem key={priority} value={priority}>
              {priority}
            </SelectItem>
          ))}
          <SelectItem
            value="CLEAR"
            className="text-red-500 focus:bg-red-50"
            onSelect={() =>
              onFilterChange({
                ...filters,
                priority: undefined,
              })
            }
          >
            Clear Priority
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
