import { Navigate, Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated } from "@/store/slices/authSlice";

const DashboardLayout = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <>
            <Navbar />

            <div>
                <Outlet />
            </div>
        </>
    )
}

export default DashboardLayout;