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
      <Input
        placeholder="Search tasks..."
        value={filters.search || ""}
        onChange={(e) => onFilterChange({ search: e.target.value })}
        className="max-w-sm"
      />

      {/* Status Filter */}
      <Select
        value={filters.status || "ALL"} // Default to "ALL" for no filter
        onValueChange={(value) =>
          onFilterChange({
            status: value === "ALL" ? undefined : (value as Status), // Map "ALL" to undefined
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Statuses</SelectItem>{" "}
          {/* Use "ALL" as the placeholder value */}
          {Object.values(Status).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Priority Filter */}
      <Select
        value={filters.priority || "ALL"} // Default to "ALL" for no filter
        onValueChange={(value) =>
          onFilterChange({
            priority: value === "ALL" ? undefined : (value as Priority), // Map "ALL" to undefined
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Priorities</SelectItem>{" "}
          {/* Use "ALL" as the placeholder value */}
          {Object.values(Priority).map((priority) => (
            <SelectItem key={priority} value={priority}>
              {priority}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
