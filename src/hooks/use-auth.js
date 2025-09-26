// src/hooks/useAuth.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi, logoutApi, checkAuthApi } from "@/api/authApi";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ✅ Load initial auth state
  const { data, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthApi,
    initialData: { isAuthenticated: false },
  });

  // ✅ Login mutation
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      queryClient.setQueryData(["auth"], { isAuthenticated: true });
    },
  });

  // ✅ Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueryData(["auth"], { isAuthenticated: false });
      navigate("/login", { replace: true });
    },
  });

  return {
    isAuthenticated: data?.isAuthenticated ?? false,
    isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
  };
};
