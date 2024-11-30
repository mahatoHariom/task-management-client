"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable: React.FC = () => {
  return (
    <div className="space-y-4 mt-4">
      {/* Simulate the table header loading */}
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Simulate multiple rows of table data loading */}
      {[...Array(5)].map((_, idx) => (
        <div key={idx} className="grid grid-cols-4 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
