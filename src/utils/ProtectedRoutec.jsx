import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
    const { userInfo } = useSelector((state) => state.auth);

    // Ensure userInfo and userInfo.role exist
    if (!userInfo || !userInfo.role) {
        return <Navigate to="/login" replace />;
    }

    // Convert role to an array (if needed)
    const userRoles = Array.isArray(userInfo.role) ? userInfo.role : [userInfo.role];

    // Check if user role is in allowedRoles
    if (!allowedRoles.some(role => userRoles.includes(role))) {
        return <h2 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
            🚫 You are not authorized to view this page.
        </h2>;
    }

    return <Outlet />;
};

export default ProtectedRoute;


const ProtectedRoute = ()  =>{
    return(
        <>
        <h1> procuted</h1>
        </>
    )
}

export default ProtectedRoute;
