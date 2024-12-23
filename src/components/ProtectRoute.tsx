import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface ProtectRouteProps {
    children: React.ReactNode;
    admin?: boolean; 
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children, admin = false }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(admin ? "adminToken" : "token");
        if (!token) {
            navigate(admin ? "/admin/login" : "/login");
        }
    }, [admin, navigate]);

    return <>{children}</>;
};
