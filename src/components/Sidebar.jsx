





// import { useState } from 'react';
// import axios from 'axios';
// import { Link } from "react-router";

// const SideBar = () => {
//     const [logoApi, setLogoApi] = useState(null);
//     const [itemIndex, setItemIndex] = useState(null);
//     const [sidebarOpen, setSidebarOpen] = useState(false);



//     const handleClick = (index) => {
//         setItemIndex(index);
//         setSidebarOpen(!sidebarOpen);
//     };

//     const menuItems = [

//         {
//             title: 'Logo',
//             icon: 'fa-solid fa-image',
//             subItems: [
//                 { title: 'Logo List', link: '/dashboard/logo-list' },
//             ],
//         },
//         {
//             title: 'Banner',
//             icon: 'fa-solid fa-layer-group',

//             subItems: [
//                 { title: 'Banner List', link: '/dashboard/banner-list' },
//             ],
//         },
//         {
//             title: 'Location',
//             icon: 'fa-solid fa-location-dot',

//             subItems: [
//                 { title: 'Country List', link: '/dashboard/country-list' },
//                 { title: 'States List', link: '/dashboard/state-list' },
//                 { title: 'City List', link: '/dashboard/city-list' },
//             ],
//         },
//         {
//             title: 'Category',
//             icon: 'fa-solid fa-layer-group',

//             subItems: [
//                 { title: 'Category List', link: '/dashboard/category-list' },
//             ],
//         },
//         {
//             title: 'Sub Category',
//             icon: 'fa fa-list-alt',
//             subItems: [
//                 { title: 'Sub Category List', link: '/dashboard/sub-category-list' },
//             ],
//         },

//         {
//             title: 'Products',
//             icon: 'fa-solid fa-cart-shopping',
//             subItems: [
//                 { title: 'Product List', link: '/dashboard/product-list' },
//             ],
//         },

//         {
//             title: 'Customer',
//             icon: 'fa-solid fa-users',
//             subItems: [
//                 { title: 'Add Customer', link: '/dashboard/add-customer' },
//                 { title: 'Customer List', link: '/dashboard/customer-list' },
//             ],
//         },
//         {
//             title: 'Change Password',
//             icon: 'fa-solid fa-key',
//             link: '/dashboard/change-password',
//         },

//         {
//             title: 'Order History List',
//             icon: 'fas fa-history',
//             link: '/dashboard/order-list',
//         },



//         {
//             title: 'Blog',
//             icon: 'fa-solid fa fa-envelope',
//             subItems: [
//                 { title: 'Post List', link: '/dashboard/post-list' },
//             ],
//         },


//     ];

//     return (
//         <aside>
//             <div className="sidebar border-end bg-white overflow-hidden sticky-top" id="sidebar">
//                 <div className="sidebar-header d-flex align-items-center justify-content-between ps-4">
//                     <div className="logo">
//                         <img
//                             className="default-logo"
//                             // src={logoApi ? logoApi[1]?.logo_img : "/img/pixer_dark.webp"}
//                             src="https://www.sigmasoftwares.org/images/logo.gif"
//                             width="115"
//                             alt="Logo"
//                         />
//                         <img
//                             className="collapsed-logo"
//                             // src={logoApi ? logoApi[3]?.logo_img : "/img/pixer-collapse-logo.webp"}
//                             src="https://www.sigmasoftwares.org/images/logo.gif"
//                             alt="Logo"
//                             style={{ width: '28px' }}
//                         />
//                     </div>
//                     <div>
//                         <button className="btn d-md-none" type="button">
//                             <div className="icon icon-sm sidebar-close-btn">
//                                 <i className="fa-solid fa-close"></i>
//                             </div>
//                         </button>
//                     </div>
//                 </div>
//                 <div className="h-100 overflow-auto p-4" id="sidebar-scroller">
//                     <ul className="menu">
//                         <li className="menu-item">
//                             <Link to="/" className="menu-link active">
//                                 <span className="menu-icon">
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none">
//                                         <path fill="currentColor" d="M8.75 4.375v3.75a.625.625 0 0 1-.625.625h-3.75a.625.625 0 0 1-.625-.625v-3.75a.625.625 0 0 1 .625-.625h3.75a.625.625 0 0 1 .625.625Zm6.875-.625h-3.75a.625.625 0 0 0-.625.625v3.75a.625.625 0 0 0 .625.625h3.75a.625.625 0 0 0 .625-.625v-3.75a.625.625 0 0 0-.625-.625Zm-7.5 7.5h-3.75a.625.625 0 0 0-.625.625v3.75a.625.625 0 0 0 .625.625h3.75a.625.625 0 0 0 .625-.625v-3.75a.625.625 0 0 0-.625-.625Zm7.5 0h-3.75a.624.624 0 0 0-.625.625v3.75a.624.624 0 0 0 .625.625h3.75a.624.624 0 0 0 .625-.625v-3.75a.624.624 0 0 0-.625-.625Z" opacity="0.2"></path>
//                                     </svg>
//                                 </span>
//                                 <span className="menu-text">Dashboard</span>
//                             </Link>
//                         </li>
//                         {menuItems.map((item, index) => (
//                             <li key={index} className={`menu-item ${item.subItems ? ` has-menu-sub ${sidebarOpen && itemIndex === index ? 'open' : ''}` : ''}`}>
//                                 <Link to={item.link || '#'} className="menu-link" onClick={() => handleClick(index)}>
//                                     <span className="menu-icon"><i className={item.icon}></i></span>
//                                     <span className="menu-text">{item.title}</span>
//                                 </Link>
//                                 {item.subItems && (
//                                     <ul className="menu-sub">
//                                         {item.subItems.map((subItem, subIndex) => (
//                                             <li key={subIndex} className="menu-item">
//                                                 <Link to={subItem.link} className="menu-link">{subItem.title}</Link>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </aside>
//     );
// };

// export default SideBar;


import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useGetLogoQuery } from '../store/features/logo/logoApi';
import BASE_URL from '../utils/imageConfig';
const SideBar = () => {
    const [itemIndex, setItemIndex] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: logos, isLoading, error, refetch } = useGetLogoQuery();

    // console.log("logo is ======>", logos)

    const { userInfo } = useSelector(state => state.auth);
    const userRole = userInfo?.role; // Get user role from Redux

    const handleClick = (index) => {
        setItemIndex(index);
        setSidebarOpen(!sidebarOpen);
    };

    // Define menu items based on roles
    const menuItemsByRole = {
        admin: [
            { title: 'Dashboard', icon: 'fa-solid fa-chart-line', link: '/dashboard' },
            { title: 'Logo', icon: 'fa-solid fa-image', subItems: [{ title: 'Logo List', link: '/dashboard/logo-list' }] },
            { title: 'Banner', icon: 'fa-solid fa-layer-group', subItems: [{ title: 'Banner List', link: '/dashboard/banner-list' }] },
            {
                title: 'Location', icon: 'fa-solid fa-location-dot', subItems: [
                    { title: 'Country List', link: '/dashboard/country-list' },
                    { title: 'State List', link: '/dashboard/state-list' },
                    { title: 'City List', link: '/dashboard/city-list' },
                ]
            },
            { title: 'Category', icon: 'fa-solid fa-layer-group', subItems: [{ title: 'Category List', link: '/dashboard/category-list' }] },
            { title: 'Sub Category', icon: 'fa fa-list-alt', subItems: [{ title: 'Sub Category List', link: '/dashboard/sub-category-list' }] },
            { title: 'Products', icon: 'fa-solid fa-cart-shopping', subItems: [{ title: 'Product List', link: '/dashboard/product-list' }] },
            // { title: 'Inventory', icon: 'fa-solid fa-warehouse', subItems: [{ title: 'Stock History', link: '/dashboard/stock-history' }] },
            {
                title: 'Stock Management',
                icon: 'fa-solid fa-warehouse',
                subItems: [{ title: 'Stock History', link: '/dashboard/stock-history' }]
            },
            {
                title: 'Customers', icon: 'fa-solid fa-users', subItems: [
                    { title: 'Add Customer', link: '/dashboard/add-customer' },
                    { title: 'Customer List', link: '/dashboard/customer-list' },
                ]
            },

            // Inventory
            { title: 'Change Password', icon: 'fa-solid fa-key', link: '/dashboard/change-password' },
            { title: 'Order History', icon: 'fas fa-history', link: '/dashboard/order-list' },
            { title: 'Blog', icon: 'fa-solid fa-envelope', subItems: [{ title: 'Post List', link: '/dashboard/post-list' }] },
        ],

        employee: [
            { title: 'Dashboard', icon: 'fa-solid fa-chart-line', link: '/dashboard' },
            // { title: 'Products', icon: 'fa-solid fa-truck-fast', link: '/dashboard/products' },
            { title: 'Products', icon: 'fa-solid fa-truck-fast', link: '/dashboard/cart-products' },
            { title: 'My Order', icon: ' fa-solid fa-list-alt', link: '/dashboard/my-orders' },




            // { title: 'heckout ', icon: 'fa-solid fa-truck-fast', link: '/dashboard/checkout ' },
            {
                title: 'Customers', icon: 'fa-solid fa-users', subItems: [
                    { title: 'Add Customer', link: '/dashboard/add-customer' },
                    // { title: 'Customer List', link: '/dashboard/customer-list' },
                ]
            },
            { title: 'Change Password', icon: 'fa-solid fa-key', link: '/dashboard/change-password' },

        ],

        customer: [
            { title: 'Dashboard', icon: 'fa-solid fa-chart-line', link: '/dashboard' },
            { title: 'Change Password', icon: 'fa-solid fa-key', link: '/dashboard/change-password' },
        ]
    };

    // Get menu items based on the user's role
    const menuItems = menuItemsByRole[userRole] || [];

    return (
        <aside>
            <div className="sidebar border-end bg-white overflow-hidden sticky-top" id="sidebar">
                <div className="sidebar-header d-flex align-items-center justify-content-between ps-4">
                    {/* <div className="logo">
                        <img className="default-logo" src="https://www.sigmasoftwares.org/images/logo.gif" width="115" alt="Logo" />
                        <img className="collapsed-logo" src="https://www.sigmasoftwares.org/images/logo.gif" alt="Logo" style={{ width: '28px' }} />
                    </div> */}
                    <div className="logo">
                        <img className="default-logo" src={logos && logos[0] ? `${BASE_URL}${logos[0].image}` : "/default-img.png"} width="115" alt="Logo" />
                        <img className="collapsed-logo" src={logos && logos[0] ? `${BASE_URL}${logos[0].image}` : "/default-img.png"} alt="Logo" style={{ width: '28px' }} />
                    </div>
                    <div>
                        <button className="btn d-md-none" type="button">
                            <div className="icon icon-sm sidebar-close-btn">
                                <i className="fa-solid fa-close"></i>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="h-100 overflow-auto p-4" id="sidebar-scroller">
                    <ul className="menu">
                        {menuItems.map((item, index) => (
                            <li key={index} className={`menu-item ${item.subItems ? `has-menu-sub ${sidebarOpen && itemIndex === index ? 'open' : ''}` : ''}`}>
                                <Link to={item.link || '#'} className="menu-link" onClick={() => handleClick(index)}>
                                    <span className="menu-icon"><i className={item.icon}></i></span>
                                    <span className="menu-text">{item.title}</span>
                                </Link>
                                {item.subItems && (
                                    <ul className="menu-sub">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <li key={subIndex} className="menu-item">
                                                <Link to={subItem.link} className="menu-link">{subItem.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;

