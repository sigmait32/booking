

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useGetDashboardStatsQuery } from "../../../store/features/dashboard/dashboardApi";
// import {
//     FaShoppingBag,
//     FaUsers,
//     FaBoxes,
//     FaTags,
//     FaLayerGroup,
//     FaGlobe,
//     FaMapMarkedAlt,
//     FaCity,
//     FaArrowRight,
//     FaWarehouse,
//     FaExclamationTriangle
// } from "react-icons/fa";
// import { Card, Row, Col } from "react-bootstrap";
// import { PulseLoader } from "react-spinners";
// import './style.css';
// import { useSelector } from "react-redux";

// const Summary = () => {
//     const navigate = useNavigate();
//     const { data, error, isLoading } = useGetDashboardStatsQuery();
//     const { userInfo } = useSelector(state => state.auth)



//     console.log('userInfo role =>', userInfo.role)
//     if (isLoading) {
//         return (
//             <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
//                 <PulseLoader color="#5e72e4" size={15} />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="alert alert-danger mx-4">
//                 <h3 className="text-center mb-0">Failed to load dashboard data</h3>
//             </div>
//         );
//     }

//     const stats = data || {};

//     const summaryCards = [
//         {
//             title: "Total Orders",
//             value: stats.totalOrders || "0",
//             icon: <FaShoppingBag size={20} />,
//             color: "#5e72e4",
//             link: "/dashboard/order-list",
//             trend: stats.orderTrend || 0
//         },
//         {
//             title: "Total Products",
//             value: stats.totalProducts || "0",
//             icon: <FaBoxes size={20} />,
//             color: "#2dce89",
//             link: "/dashboard/product-list",
//             trend: stats.productTrend || 0
//         },
//         {
//             title: "Total Stock",
//             value: stats.totalStock || "0",
//             icon: <FaWarehouse size={20} />,
//             color: "#007bff",
//             link: "/dashboard/stock-history",
//             trend: stats.stockTrend || 0
//         },
//         {
//             title: "Out of Stock",
//             value: stats.outOfStockProducts || "0",
//             icon: <FaExclamationTriangle size={20} />,
//             color: "#dc3545",
//             link: "/dashboard/stock-history",
//             trend: stats.outOfStockTrend || 0
//         },

//         {
//             title: "Total Categories",
//             value: stats.totalCategories || "0",
//             icon: <FaTags size={20} />,
//             color: "#11cdef",
//             link: "/dashboard/category-list",
//             trend: stats.categoryTrend || 0
//         },
//         {
//             title: "Sub Categories",
//             value: stats.totalSubCategories || "0",
//             icon: <FaLayerGroup size={20} />,
//             color: "#fb6340",
//             link: "/dashboard/sub-category-list",
//             trend: stats.subCategoryTrend || 0
//         },
//         {
//             title: "Total Customers",
//             value: stats.totalCustomers || "0",
//             icon: <FaUsers size={20} />,
//             color: "#f5365c",
//             link: "/dashboard/customer-list",
//             trend: stats.customerTrend || 0
//         },
//         {
//             title: "Total Employees",
//             value: stats.totalEmployees || "0",
//             icon: <FaUsers size={20} />,
//             color: "#ffd600",
//             link: "/dashboard/employee-list",
//             trend: stats.employeeTrend || 0
//         },
//         {
//             title: "Total Banners",
//             value: stats.totalBanners || "0",
//             icon: <FaTags size={20} />,
//             color: "#8965e0",
//             link: "/dashboard/banner-list",
//             trend: stats.bannerTrend || 0
//         },
//         {
//             title: "Total Countries",
//             value: stats.totalCountries || "0",
//             icon: <FaGlobe size={20} />,
//             color: "#ff5733",
//             link: "/dashboard/country-list",
//             trend: stats.countryTrend || 0
//         },
//         {
//             title: "Total States",
//             value: stats.totalStates || "0",
//             icon: <FaMapMarkedAlt size={20} />,
//             color: "#17a2b8",
//             link: "/dashboard/state-list",
//             trend: stats.stateTrend || 0
//         },
//         {
//             title: "Total Cities",
//             value: stats.totalCities || "0",
//             icon: <FaCity size={20} />,
//             color: "#ff9800",
//             link: "/dashboard/city-list",
//             trend: stats.cityTrend || 0
//         },
//         // New Stock Cards

//     ];

//     const getTrendIndicator = (value) => {
//         if (value > 0) {
//             return <span className="text-success small fw-bold">+{value}% <i className="fas fa-arrow-up"></i></span>;
//         } else if (value < 0) {
//             return <span className="text-danger small fw-bold">{value}% <i className="fas fa-arrow-down"></i></span>;
//         }
//         return <span className="text-muted small fw-bold">0%</span>;
//     };

//     return (
//         <div className="container-fluid px-4 py-3">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2 className="h4 mb-0 fw-bold text-gray-800">Dashboard Overview</h2>
//                 <small className="text-muted">Last updated: {new Date().toLocaleString()}</small>
//             </div>

//             <Row className="g-4">
//                 {summaryCards.map((card, index) => (
//                     <Col key={index} xl={3} lg={4} md={6} sm={6} xs={12}>
//                         <Card
//                             className="h-100 border-0 shadow-hover"
//                             onClick={() => navigate(card.link)}
//                             style={{
//                                 cursor: "pointer",
//                                 transition: "all 0.3s ease",
//                                 borderRadius: "12px"
//                             }}
//                         >
//                             <Card.Body className="p-4">
//                                 <div className="d-flex justify-content-between align-items-start">
//                                     <div className="icon-wrapper rounded-circle p-3 mb-3"
//                                         style={{
//                                             backgroundColor: `${card.color}15`,
//                                             color: card.color
//                                         }}>
//                                         {card.icon}
//                                     </div>
//                                     <div className="d-flex align-items-center">
//                                         {getTrendIndicator(card.trend)}
//                                     </div>
//                                 </div>

//                                 <h6 className="text-uppercase text-muted mb-1 small fw-bold">
//                                     {card.title}
//                                 </h6>
//                                 <h3 className="mb-3 fw-bold" style={{ color: card.color }}>
//                                     {card.value}
//                                 </h3>

//                                 <div className="d-flex align-items-center">
//                                     <span className="small text-muted">View details</span>
//                                     <FaArrowRight className="ms-2 small" style={{ color: card.color }} />
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </div>
//     );
// };

// export default Summary;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetDashboardStatsQuery } from "../../../store/features/dashboard/dashboardApi";
import {
    FaShoppingBag,
    FaUsers,
    FaBoxes,
    FaTags,
    FaLayerGroup,
    FaGlobe,
    FaMapMarkedAlt,
    FaCity,
    FaArrowRight,
    FaWarehouse,
    FaExclamationTriangle,
    FaInfoCircle
} from "react-icons/fa";
import { Card, Row, Col, Alert } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { useSelector } from "react-redux";

const Summary = () => {
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetDashboardStatsQuery();
    const { userInfo } = useSelector(state => state.auth);
    const isAdmin = userInfo?.role === 'admin';

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                <PulseLoader color="#5e72e4" size={15} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mx-4">
                <h3 className="text-center mb-0">Failed to load dashboard data</h3>
            </div>
        );
    }

    const stats = data || {};

    // Static data for non-admin users
    const orderStatusData = {
        labels: ['Completed', 'Processing', 'Cancelled'],
        datasets: [{
            data: [75, 15, 10],
            backgroundColor: ['#2dce89', '#fb6340', '#f5365c']
        }]
    };

    const salesTrendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: '#5e72e4'
        }]
    };

    const getTrendIndicator = (value) => {
        if (value > 0) {
            return <span className="text-success small fw-bold">+{value}% <i className="fas fa-arrow-up"></i></span>;
        } else if (value < 0) {
            return <span className="text-danger small fw-bold">{value}% <i className="fas fa-arrow-down"></i></span>;
        }
        return <span className="text-muted small fw-bold">0%</span>;
    };

    const summaryCards = [
        {
            title: "Total Orders",
            value: stats.totalOrders || "0",
            icon: <FaShoppingBag size={20} />,
            color: "#5e72e4",
            link: "/dashboard/order-list",
            trend: stats.orderTrend || 0
        },
        {
            title: "Total Products",
            value: stats.totalProducts || "0",
            icon: <FaBoxes size={20} />,
            color: "#2dce89",
            link: "/dashboard/product-list",
            trend: stats.productTrend || 0
        },
        {
            title: "Total Stock",
            value: stats.totalStock || "0",
            icon: <FaWarehouse size={20} />,
            color: "#007bff",
            link: "/dashboard/stock-history",
            trend: stats.stockTrend || 0
        },
        {
            title: "Out of Stock",
            value: stats.outOfStockProducts || "0",
            icon: <FaExclamationTriangle size={20} />,
            color: "#dc3545",
            link: "/dashboard/stock-history",
            trend: stats.outOfStockTrend || 0
        },

        {
            title: "Total Categories",
            value: stats.totalCategories || "0",
            icon: <FaTags size={20} />,
            color: "#11cdef",
            link: "/dashboard/category-list",
            trend: stats.categoryTrend || 0
        },
        {
            title: "Sub Categories",
            value: stats.totalSubCategories || "0",
            icon: <FaLayerGroup size={20} />,
            color: "#fb6340",
            link: "/dashboard/sub-category-list",
            trend: stats.subCategoryTrend || 0
        },
        {
            title: "Total Customers",
            value: stats.totalCustomers || "0",
            icon: <FaUsers size={20} />,
            color: "#f5365c",
            link: "/dashboard/customer-list",
            trend: stats.customerTrend || 0
        },
        {
            title: "Total Employees",
            value: stats.totalEmployees || "0",
            icon: <FaUsers size={20} />,
            color: "#ffd600",
            link: "/dashboard/employee-list",
            trend: stats.employeeTrend || 0
        },
        {
            title: "Total Banners",
            value: stats.totalBanners || "0",
            icon: <FaTags size={20} />,
            color: "#8965e0",
            link: "/dashboard/banner-list",
            trend: stats.bannerTrend || 0
        },
        {
            title: "Total Countries",
            value: stats.totalCountries || "0",
            icon: <FaGlobe size={20} />,
            color: "#ff5733",
            link: "/dashboard/country-list",
            trend: stats.countryTrend || 0
        },
        {
            title: "Total States",
            value: stats.totalStates || "0",
            icon: <FaMapMarkedAlt size={20} />,
            color: "#17a2b8",
            link: "/dashboard/state-list",
            trend: stats.stateTrend || 0
        },
        {
            title: "Total Cities",
            value: stats.totalCities || "0",
            icon: <FaCity size={20} />,
            color: "#ff9800",
            link: "/dashboard/city-list",
            trend: stats.cityTrend || 0
        },
        // New Stock Cards
    ];

    if (isAdmin) {
        return (
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h4 mb-0 fw-bold text-gray-800">Dashboard Overview</h2>
                    <small className="text-muted">Last updated: {new Date().toLocaleString()}</small>
                </div>

                <Row className="g-4">
                    {summaryCards.map((card, index) => (
                        <Col key={index} xl={3} lg={4} md={6} sm={6} xs={12}>
                            <Card
                                className="h-100 border-0 shadow-hover"
                                onClick={() => navigate(card.link)}
                                style={{
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    borderRadius: "12px"
                                }}
                            >
                                <Card.Body className="p-4">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className="icon-wrapper rounded-circle p-3 mb-3"
                                            style={{
                                                backgroundColor: `${card.color}15`,
                                                color: card.color
                                            }}>
                                            {card.icon}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            {getTrendIndicator(card.trend)}
                                        </div>
                                    </div>

                                    <h6 className="text-uppercase text-muted mb-1 small fw-bold">
                                        {card.title}
                                    </h6>
                                    <h3 className="mb-3 fw-bold" style={{ color: card.color }}>
                                        {card.value}
                                    </h3>

                                    <div className="d-flex align-items-center">
                                        <span className="small text-muted">View details</span>
                                        <FaArrowRight className="ms-2 small" style={{ color: card.color }} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }

    // Non-admin view
    return (
        <div className="container-fluid px-4 py-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0 fw-bold text-gray-800">Your Dashboard</h2>
                <small className="text-muted">Last updated: {new Date().toLocaleString()}</small>
            </div>

            <Row className="g-4">
                <Col lg={6} md={12}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <h5 className="card-title">Order Status</h5>
                            <div style={{ height: '300px' }}>
                                <Doughnut
                                    data={orderStatusData}
                                    options={{ maintainAspectRatio: false }}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6} md={12}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <h5 className="card-title">Sales Trend</h5>
                            <div style={{ height: '300px' }}>
                                <Bar
                                    data={salesTrendData}
                                    options={{ maintainAspectRatio: false }}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Alert variant="info" className="mt-4">
                <FaInfoCircle className="me-2" />
                Contact your administrator for access to additional features.
            </Alert>
        </div>
    );
};

export default Summary;