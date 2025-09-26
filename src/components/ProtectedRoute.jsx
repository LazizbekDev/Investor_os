import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const fetchAuth = async () => {
  const saved = localStorage.getItem("isAuthenticated");
  return saved === "true";
};

export default function ProtectedRoute({ children }) {
  const { data: isAuthenticated, isLoading, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
    staleTime: Infinity, // auth status localStorage’dan o‘zgarmaguncha valid
  });

  useEffect(() => {
    const listener = () => {
      refetch();
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
