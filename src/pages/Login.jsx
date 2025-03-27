
// import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; //

// import { useDispatch, useSelector } from 'react-redux';
// import { customer_login, messageClear } from '../store/reducers/authReducer';
// import { FadeLoader } from 'react-spinners';

// const Login = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { loader, errorMessage, successMessage, userInfo } = useSelector((state) => state.auth);

//     const [state, setState] = useState({
//         email: '',
//         password: '',
//     });

//     const inputHandle = (e) => {
//         setState({
//             ...state,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const login = (e) => {
//         e.preventDefault();
//         dispatch(customer_login(state)); // Dispatch the login action
//     };

//     useEffect(() => {
//         if (successMessage) {
//             toast.success(successMessage); // Show success toast
//             dispatch(messageClear()); // Clear success message
//         }
//         if (errorMessage) {
//             toast.error(errorMessage); // Show error toast
//             dispatch(messageClear()); // Clear error message
//         }
//         if (userInfo) {
//             navigate('/dashboard'); // Redirect to dashboard if user is logged in
//         }
//     }, [successMessage, errorMessage, userInfo, dispatch, navigate]);

//     return (
//         <div className="overflow-hidden d-flex justify-content-center min-vh-100 min-vw-100">
//             <ToastContainer />
//             <div className="row justify-content-center align-items-center w-100">
//                 <div className="col-12" style={{ maxWidth: '460px' }}>
//                     <div className="card p-3 border-0 login-form-card">
//                         <div className="card-body" style={{ background: '#fff' }}>
//                             <div className="text-center mb-4">
//                                 <img
//                                     className="mb-3"
//                                     src="https://www.sigmasoftwares.org/images/logo.gif"
//                                     width="115px"
//                                     alt="Logo"
//                                 />
//                                 <p className="fst-italic text-dark-emphasis">Login to dashboard</p>
//                                 {loader && <FadeLoader color="#36d7b7" />} {/* Show loader if loading */}
//                             </div>
//                             <form onSubmit={login} className="login-form">
//                                 <div className="row mb-4">
//                                     <div className="col-12">
//                                         <label className="form-label fw-medium">Email</label>
//                                         <input
//                                             className="form-control"
//                                             type="email"
//                                             name="email"
//                                             placeholder="Email Address"
//                                             onChange={inputHandle}
//                                             value={state.email}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row mb-4">
//                                     <div className="col-12">
//                                         <div className="d-flex justify-content-between align-items-center">
//                                             <label className="form-label fw-medium">Password</label>
//                                         </div>
//                                         <input
//                                             className="form-control"
//                                             type="password"
//                                             name="password"
//                                             placeholder="Password"
//                                             onChange={inputHandle}
//                                             value={state.password}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-12">
//                                         <button
//                                             className="btn btn-primary w-100 fw-medium shadow-none"
//                                             type="submit"
//                                             disabled={loader} // Disable button while loading
//                                         >
//                                             {loader ? 'Logging in...' : 'Login'}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import { useDispatch, useSelector } from 'react-redux';
import { customer_login, messageClear } from '../store/reducers/authReducer';
import { FadeLoader } from 'react-spinners';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loader, errorMessage, successMessage, userInfo } = useSelector((state) => state.auth);

    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const inputHandle = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const login = (e) => {
        e.preventDefault();
        dispatch(customer_login(state));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            setTimeout(() => dispatch(messageClear()), 3000); // Delay clearing message
        }
        if (errorMessage) {
            toast.error(errorMessage);
            setTimeout(() => dispatch(messageClear()), 3000);
        }
    }, [successMessage, errorMessage]);

    useEffect(() => {
        if (userInfo) {
            navigate('/dashboard'); // Redirect only when user logs in
        }
    }, [userInfo, navigate]);

    return (
        <div className="overflow-hidden d-flex justify-content-center min-vh-100 min-vw-100">
            <ToastContainer
    position="top-center" // Centers the toast at the top
    autoClose={3000} // Closes after 3 seconds
    hideProgressBar={false} // Shows the progress bar
    closeOnClick
    pauseOnHover
    draggable
    theme="colored"
/>
            <div className="row justify-content-center align-items-center w-100">
                <div className="col-12" style={{ maxWidth: '460px' }}>
                    <div className="card p-3 border-0 login-form-card">
                        <div className="card-body" style={{ background: '#fff' }}>
                            <div className="text-center mb-4">
                                <img
                                    className="mb-3"
                                    src="https://www.sigmasoftwares.org/images/logo.gif"
                                    width="115px"
                                    alt="Logo"
                                />
                                <p className="fst-italic text-dark-emphasis">Login to dashboard</p>
                                {loader && (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
        <FadeLoader color="#36d7b7" />
    </div>
)}

                            </div>
                            <form onSubmit={login} className="login-form">
                                <div className="mb-4">
                                    <label className="form-label fw-medium">Email</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        onChange={inputHandle}
                                        value={state.email}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label fw-medium">Password</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={inputHandle}
                                        value={state.password}
                                        required
                                    />
                                </div>
                                <button
                                    className="btn btn-primary w-100 fw-medium shadow-none"
                                    type="submit"
                                    disabled={loader}
                                >
                                    {loader ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
