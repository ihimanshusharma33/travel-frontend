import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface ProtectRouteProps {
    children: React.ReactNode;
    admin?: boolean; // Optional prop to indicate admin-only routes
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children, admin = false }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(admin ? "admintoken" : "token");

        if (!token) {
            navigate(admin ? "/admin/login" : "/login");
        }
    }, [admin, navigate]);

    return <>{children}</>;
};
