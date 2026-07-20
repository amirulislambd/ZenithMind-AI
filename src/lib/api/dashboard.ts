"use client";

import { useQuery } from "@tanstack/react-query";
import { GetServer } from "../core/servermutaion";

export async function getDashboardStatsServer(role?: string) {
  if (!role) {
    throw new Error("User role is required to fetch stats.");
  }

  const url = role === "admin" ? "/dashboard/admin-stats" : "/dashboard/user-stats";
  
  const result = await GetServer(url, true);

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch dashboard statistics");
  }

  return result.data;
}

export function useDashboardStats(role: string | undefined) {
  return useQuery({
    queryKey: ["dashboardStats", role],
    queryFn: () => getDashboardStatsServer(role),
    enabled: Boolean(role), 
    refetchInterval: 30000, 
    staleTime: 10000,
  });
}