import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, dismissNotificationApi, markAllAsReadApi } from "@/api/notificationsApi";

export const useNotifications = () => {
  const queryClient = useQueryClient();

  // Notificationsni olish
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  // Dismiss (o‘chirish)
  const dismissMutation = useMutation({
    mutationFn: dismissNotificationApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  // Mark all as read
  const markAllMutation = useMutation({
    mutationFn: markAllAsReadApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  return {
    notifications,
    isLoading,
    dismiss: dismissMutation.mutate,
    markAllAsRead: markAllMutation.mutate,
  };
};
