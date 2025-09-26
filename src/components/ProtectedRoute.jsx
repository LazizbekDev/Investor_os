import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchAuth = async () => {
  const saved = localStorage.getItem("isAuthenticated");
  return saved === "true";
};

export default function ProtectedRoute({ children }) {
  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
    staleTime: Infinity, // auth status localStorage’dan o‘zgarmaguncha valid
  });

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
