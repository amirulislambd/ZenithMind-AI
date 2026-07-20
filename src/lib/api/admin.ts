import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetServer, ServerMutation } from "../core/servermutaion";

export async function getAdminPanelData() {
  const result = await GetServer("/dashboard/admin-panel", true);
  if (!result.success) {
    throw new Error(result.error || "Failed to fetch admin panel data");
  }
  return result.data;
}

export function useAdminPanelData() {
  return useQuery({
    queryKey: ["adminPanelData"],
    queryFn: getAdminPanelData,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
  });
}

export function useUpdateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, updates }: { userId: string; updates: any }) => {
      const result = await ServerMutation(`/dashboard/users/${userId}`, updates, "PUT", true);
      if (!result.success) {
        throw new Error(result.error || "Failed to update user");
      }
      return result.data;
    },
    async onMutate({ userId, updates }) {
      await queryClient.cancelQueries({ queryKey: ["adminPanelData"] });
      const previousData = queryClient.getQueryData<any>(["adminPanelData"]);

      if (previousData) {
        const existingUser = previousData.users.find((user: any) => user.id === userId);
        const adminCountDelta = existingUser
          ? updates.role === "admin"
            ? existingUser.role === "admin"
              ? 0
              : 1
            : updates.role === "user" && existingUser.role === "admin"
            ? -1
            : 0
          : 0;

        queryClient.setQueryData(["adminPanelData"], {
          ...previousData,
          users: previousData.users.map((user: any) =>
            user.id === userId ? { ...user, ...updates } : user,
          ),
          stats: {
            ...previousData.stats,
            admins: previousData.stats
              ? previousData.stats.admins + adminCountDelta
              : previousData.stats,
          },
        });
      }

      return { previousData };
    },
    onError(_error, _variables, context: any) {
      if (context?.previousData) {
        queryClient.setQueryData(["adminPanelData"], context.previousData);
      }
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["adminPanelData"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          users: oldData.users.map((user: any) =>
            user.id === updatedUser.id ? { ...user, ...updatedUser } : user,
          ),
        };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPanelData"] });
    },
  });
}
