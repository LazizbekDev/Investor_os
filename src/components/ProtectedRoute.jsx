import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();
    console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}