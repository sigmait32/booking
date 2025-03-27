import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { userInfo } = useSelector((state) => state.auth);

    console.log("🔍 Checking access for role:", userInfo?.role);

    // Redirect to login if no user is logged in
    if (!userInfo || !userInfo.role) {
        return <Navigate to="/login" replace />;
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(userInfo.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;




// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ allowedRoles = [] }) => {
//     const { userInfo } = useSelector((state) => state.auth);
//     const location = useLocation();

//     // Handle loading state (e.g., userInfo is still being fetched)
//     if (!userInfo) {
//         return null; // or a loading spinner
//     }

//     // Ensure allowedRoles is always an array
//     const normalizedAllowedRoles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

//     // Normalize user roles to an array
//     const userRoles = Array.isArray(userInfo.role) ? userInfo.role : [userInfo.role];

//     // Check if user is authenticated
//     if (!userInfo || !userInfo.role) {
//         // Redirect to login and pass the current location for post-login redirect
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     // Check if user has any of the allowed roles
//     const isAuthorized = userRoles.some((role) => normalizedAllowedRoles.includes(role));

//     if (!isAuthorized) {
//         return (
//             <h2 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
//                 🚫 You are not authorized to view this page.
//             </h2>
//         );
//     }

//     return <Outlet />;
// };

// export default ProtectedRoute;
