"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export const useUrlParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Convert searchParams to a plain object
  const params = Object.fromEntries(searchParams.entries());

  // Method to update search parameters
  const setParams = useCallback(
    (newParams: { [key: string]: string | null }) => {
      try {
        const current = new URLSearchParams(searchParams);

        // Detailed logging of input parameters
        console.group("URL Parameter Update");
        console.log("Current Pathname:", pathname);
        console.log("Existing Params:", Object.fromEntries(current.entries()));
        console.log("New Params:", newParams);

        // Update or remove parameters
        Object.entries(newParams).forEach(([key, value]) => {
          if (value === null) {
            console.log(`Deleting parameter: ${key}`);
            current.delete(key);
          } else {
            console.log(`Setting parameter: ${key} = ${value}`);
            current.set(key, value);
          }
        });

        // Generate the new search string
        const search = current.toString();
        const query = search ? `?${search}` : "";
        const fullUrl = `${pathname}${query}`;

        console.log("Final URL:", fullUrl);
        console.groupEnd();

        // Use replace instead of push to avoid adding to browser history
        router.replace(fullUrl, { scroll: false });
      } catch (error) {
        console.error("Error updating URL parameters:", error);
      }
    },
    [searchParams, pathname, router]
  );

  // Get a specific parameter
  const getParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  return {
    params,
    setParams,
    getParam,
  };
};
