import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this is imported
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { user_reset } from '../store/reducers/authReducer';
import { Link } from "react-router";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth)
    const logout = async () => {
        try {
            const { data } = await api.get('/logout'); // Call the logout API
            localStorage.removeItem('token'); // Remove token from localStorage
            dispatch(user_reset()); // Dispatch the user_reset action
            toast.success("Logged out successfully"); // Show success toast
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.log(error.response.data); // Log any errors
            toast.error("Failed to logout"); // Show error toast
        }
    };

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);





    const headerProfileMenuToggle = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);

        const headerProfileMenuCard = document.querySelector('.header-profile-menu-card');
        if (headerProfileMenuCard) {
            headerProfileMenuCard.classList.toggle('active');
        }
    };



    const sidebarToggle = () => {
        const browserWidth = window.innerWidth || document.documentElement.clientWidth;

        if (browserWidth > 768) {
            setIsSidebarCollapsed(!isSidebarCollapsed);
        } else {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    // Optional: Effect to add or remove classes based on state
    useEffect(() => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            if (isSidebarCollapsed) {
                sidebar.classList.add('collapsed');
            } else {
                sidebar.classList.remove('collapsed');
            }

            if (isSidebarOpen) {
                sidebar.classList.add('open');
            } else {
                sidebar.classList.remove('open');
            }
        }
    }, [isSidebarCollapsed, isSidebarOpen]);



    return (
        <>
            {/* <ToastContainer /> */}

            <header className="bg-white d-flex align-items-center sticky-top">
                <nav className="navbar navbar-expand-sm d-md-block bg-white w-100">
                    <div className="container-fluid">
                        <div className="d-flex w-100 align-items-center">
                            <div>
                                <button type="button" className="sidebar-toggle-btn btn" id="sidebar-toggle-btn" onClick={sidebarToggle}>

                                    <span></span>
                                </button>

                            </div>
                            <div className="w-100">
                                <div className="row w-100 align-items-center">
                                    <div className="col-5 me-auto d-none d-md-block">
                                        <div className="search-box d-flex align-items-center border rounded-5 overflow-hidden ms-3 bg-gray-1">
                                            <div className="h-100 ps-3">
                                                <i className="fa-solid fa-search"></i>
                                            </div>
                                            <form className="flex-grow-1" action="#">
                                                <input className="form-control shadow-none border-0 bg-transparent h-auto" type="text" name="" placeholder="Search..." />
                                            </form>
                                        </div>
                                    </div>
                                    {/* <div className="col-2 d-none d-lg-block">
                                        <div className="d-flex justify-content-center">
                                            <a className="btn btn-primary px-3 py-2 rounded-5 h-auto" href="#">Create Shop</a>
                                        </div>
                                    </div> */}
                                    <div className="col-2 border-start border-end d-none d-lg-block">
                                        <div className="d-flex justify-content-center">
                                            <a className="btn btn-outline-primary px-3 py-2 rounded-5 h-auto" href="https://punamhouse.com">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.91726 1.6875C3.54451 1.6875 3.18676 1.836 2.92351 2.1L1.94851 3.0735C1.44468 3.57639 1.15029 4.25163 1.12471 4.96304C1.09914 5.67444 1.34427 6.36907 1.81069 6.90685C2.27711 7.44463 2.9301 7.78553 3.63797 7.86081C4.34584 7.93609 5.05592 7.74015 5.62501 7.3125C6.09526 7.665 6.67951 7.875 7.31251 7.875C7.94551 7.875 8.53051 7.665 9.00001 7.3125C9.46951 7.665 10.0545 7.875 10.6875 7.875C11.3205 7.875 11.9048 7.665 12.375 7.3125C12.9441 7.74015 13.6542 7.93609 14.362 7.86081C15.0699 7.78553 15.7229 7.44463 16.1893 6.90685C16.6557 6.36907 16.9009 5.67444 16.8753 4.96304C16.8497 4.25163 16.5553 3.57639 16.0515 3.0735L15.0765 2.09925C14.8129 1.83573 14.4555 1.68763 14.0828 1.6875H3.91726Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 15.1875V8.62126C3.315 9.12676 4.56 9.12601 5.625 8.62126C6.15235 8.8714 6.72884 9.00079 7.3125 9.00001C7.9155 9.00001 8.4885 8.86351 9 8.62051C9.52729 8.87091 10.1038 9.00055 10.6875 9.00001C11.2905 9.00001 11.8628 8.86351 12.375 8.62051C13.44 9.12601 14.685 9.12676 15.75 8.62126V15.1875H16.3125C16.4617 15.1875 16.6048 15.2468 16.7102 15.3523C16.8157 15.4578 16.875 15.6008 16.875 15.75C16.875 15.8992 16.8157 16.0423 16.7102 16.1478C16.6048 16.2533 16.4617 16.3125 16.3125 16.3125H1.6875C1.53832 16.3125 1.39524 16.2533 1.28975 16.1478C1.18426 16.0423 1.125 15.8992 1.125 15.75C1.125 15.6008 1.18426 15.4578 1.28975 15.3523C1.39524 15.2468 1.53832 15.1875 1.6875 15.1875H2.25ZM4.5 10.6875C4.5 10.5383 4.55926 10.3953 4.66475 10.2898C4.77024 10.1843 4.91332 10.125 5.0625 10.125H7.3125C7.46168 10.125 7.60476 10.1843 7.71025 10.2898C7.81574 10.3953 7.875 10.5383 7.875 10.6875V12.9375C7.875 13.0867 7.81574 13.2298 7.71025 13.3353C7.60476 13.4408 7.46168 13.5 7.3125 13.5H5.0625C4.91332 13.5 4.77024 13.4408 4.66475 13.3353C4.55926 13.2298 4.5 13.0867 4.5 12.9375V10.6875ZM10.6875 10.125C10.5383 10.125 10.3952 10.1843 10.2898 10.2898C10.1843 10.3953 10.125 10.5383 10.125 10.6875V14.625C10.125 14.9355 10.377 15.1875 10.6875 15.1875H12.9375C13.0867 15.1875 13.2298 15.1283 13.3352 15.0228C13.4407 14.9173 13.5 14.7742 13.5 14.625V10.6875C13.5 10.5383 13.4407 10.3953 13.3352 10.2898C13.2298 10.1843 13.0867 10.125 12.9375 10.125H10.6875Z" fill="currentColor"></path></svg>
                                                Visit Site
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-auto col-md-2 ms-auto ms-md-0">
                                        <div className="position-relative">
                                            <button className="btn header-profile-menu-btn" type="button" id="header-profile-menu-btn" onClick={headerProfileMenuToggle}>
                                                {/* <button className="btn header-profile-menu-btn" type="button" id="header-profile-menu-btn"> */}
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <div className="me-2">
                                                        <span className="avatar icon rounded-circle shadow">A</span>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 text-truncate text-start" style={{ fontSize: '14px' }}><strong> {userInfo?.name || "Loading..."} </strong></p>
                                                        {/* <Link
                                                                    href="/login"
                                                                    className="btn btn-danger px-4 text-white login-header-btn float-right"
                                                                >
                                                                    Login
                                                                </Link> */}
                                                        <p className="mb-0 text-secondary text-truncate" style={{ fontSize: '13px' }}>{userInfo?.role || "Loading ..."} </p>
                                                    </div>
                                                </div>
                                            </button>
                                            <div className="position-absolute end-0 card header-profile-menu-card shadow mt-3">
                                                <div className="card-header bg-white border-bottom px-2" style={{ '--bs-border-style': 'dashed' }}>
                                                    <div className="d-flex align-items-center bg-gray-1 p-2 rounded-2">
                                                        <div className="me-2">
                                                            <span className="avatar icon rounded-circle shadow">A</span>
                                                        </div>
                                                        <div>
                                                            <p className="mb-0 text-truncate" style={{ fontSize: '14px' }}><strong>{userInfo?.name || "Loading..."} </strong></p>
                                                            <p className="mb-0 text-secondary text-truncate" style={{ fontSize: '13px' }}>S{userInfo?.role || "Loading..."}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <ul className="list-unstyled m-0">
                                                        <li>
                                                            <a href="#" className="menu-link">
                                                                <div className="d-flex align-items-center py-2">
                                                                    <span className="d-inline-flex align-items-center me-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20px" width="20px" role="none"><path fill="currentColor" d="M17.5 10a7.483 7.483 0 0 1-2.484 5.576A5.625 5.625 0 0 0 10 12.5a3.125 3.125 0 1 0 0-6.25 3.125 3.125 0 0 0 0 6.25 5.624 5.624 0 0 0-5.016 3.076A7.5 7.5 0 1 1 17.5 10Z" opacity="0.2" role="none"></path><path fill="currentColor" d="M10 1.875A8.125 8.125 0 1 0 18.125 10 8.133 8.133 0 0 0 10 1.875ZM5.787 15.43a5 5 0 0 1 8.425 0 6.862 6.862 0 0 1-8.425 0ZM7.5 9.375a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm7.637 5.188a6.223 6.223 0 0 0-2.817-2.246 3.75 3.75 0 1 0-4.64 0 6.223 6.223 0 0 0-2.817 2.246 6.875 6.875 0 1 1 10.274 0Z" role="none"></path></svg></span>
                                                                    <span>Profile</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="menu-link">
                                                                <div className="d-flex align-items-center py-2">
                                                                    <span className="d-inline-flex align-items-center me-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20px" width="20px" role="none"><path fill="currentColor" d="m17.5 5.625-2.228 7.243a1.25 1.25 0 0 1-1.196.882H6.568a1.25 1.25 0 0 1-1.202-.906L3.304 5.625H17.5Z" opacity="0.2" role="none"></path><path fill="currentColor" d="M7.5 16.875a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm6.875-1.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm3.723-9.816-2.23 7.243a1.866 1.866 0 0 1-1.791 1.323H6.568a1.883 1.883 0 0 1-1.802-1.36l-2.827-9.89H.625a.625.625 0 0 1 0-1.25h1.314a1.256 1.256 0 0 1 1.202.906L3.775 5H17.5a.625.625 0 0 1 .598.809Zm-1.444.441H4.132l1.835 6.422a.625.625 0 0 0 .601.453h7.509a.625.625 0 0 0 .597-.441l1.98-6.434Z" role="none"></path></svg></span>
                                                                    <span>Create Shop</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="menu-link">
                                                                <div className="d-flex align-items-center py-2">
                                                                    <span className="d-inline-flex align-items-center me-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20px" width="20px" role="none"><path fill="currentColor" d="M15.625 3.125v13.75H4.375V3.125h11.25Z" opacity="0.2" role="none"></path><path fill="currentColor" d="M10.625 9.375v7.5a.624.624 0 1 1-1.25 0v-7.5a.625.625 0 0 1 1.25 0Zm5 5.625a.624.624 0 0 0-.625.625v1.25a.624.624 0 1 0 1.25 0v-1.25a.624.624 0 0 0-.625-.625Zm1.875-2.5h-1.25V3.125a.625.625 0 1 0-1.25 0V12.5h-1.25a.624.624 0 1 0 0 1.25h3.75a.624.624 0 1 0 0-1.25Zm-13.125 0a.625.625 0 0 0-.625.625v3.75a.625.625 0 1 0 1.25 0v-3.75a.625.625 0 0 0-.625-.625ZM6.25 10H5V3.125a.625.625 0 0 0-1.25 0V10H2.5a.625.625 0 1 0 0 1.25h3.75a.625.625 0 1 0 0-1.25Zm5.625-3.75h-1.25V3.125a.625.625 0 1 0-1.25 0V6.25h-1.25a.625.625 0 0 0 0 1.25h3.75a.625.625 0 1 0 0-1.25Z" role="none"></path></svg></span>
                                                                    <span>Settings</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="card-footer bg-white border-top" style={{ '--bs-border-style': 'dashed' }}>
                                                    <ul className="list-unstyled m-0">
                                                        <li>
                                                            <Link to="" className="menu-link">
                                                                {/* <div className="d-flex align-items-center py-2" onClick={() => handleLogout()}> */}
                                                                <div className="d-flex align-items-center py-2" onClick={logout}>
                                                                    <span className="d-inline-flex align-items-center me-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20px" width="20px" role="none"><path fill="currentColor" d="m16.875 10-3.125 3.125v-6.25L16.875 10Z" opacity="0.2" role="none"></path><path fill="currentColor" d="M8.75 16.875a.625.625 0 0 1-.625.625H3.75a1.25 1.25 0 0 1-1.25-1.25V3.75A1.25 1.25 0 0 1 3.75 2.5h4.375a.625.625 0 0 1 0 1.25H3.75v12.5h4.375a.625.625 0 0 1 .625.625Zm8.567-6.433-3.125 3.125a.625.625 0 0 1-1.067-.442v-2.5h-5a.625.625 0 1 1 0-1.25h5v-2.5a.625.625 0 0 1 1.067-.442l3.125 3.125a.626.626 0 0 1 0 .884ZM15.99 10l-1.614-1.616v3.232L15.989 10Z" role="none"></path></svg></span>
                                                                    <span>Logout</span>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    );
};

export default Header;