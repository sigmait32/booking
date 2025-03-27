// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectUser = () => {
//     const { userInfo } = useSelector(state => state.auth)
//     if (userInfo) {
//         return <Outlet />
//     } else {
//         return <Navigate to='/login' replace={true} />
//     }

// };

// export default ProtectUser;

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectUser = () => {
    const { userInfo } = useSelector(state => state.auth);

    // Redirect to login if user is not authenticated
    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectUser;
