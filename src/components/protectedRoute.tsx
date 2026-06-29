import { Navigate } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
}

interface Props {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
        return <Navigate to="/" replace />;
    }

    let user: User | null = null;

    try {
        user = JSON.parse(storedUser);
    } catch {
        localStorage.removeItem("user");
        return <Navigate to="/" replace />;
    }

    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;