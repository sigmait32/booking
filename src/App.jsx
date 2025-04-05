
// import { BrowserRouter, Routes, Route } from "react-router";
// import Home from './pages/Home';
// import About from './pages/About';
// // import AuthLayout from './pages/AuthLayout';
// import Login from './pages/Login';
// // import Register from './pages/Register';
// import ProtectUser from "./utils/ProtectUser";
// import Dashboard from './pages/Dashboard';
// import Summery from "./components/dashboard/summery";
// import CategoryList from './components/dashboard/category'
// import AddCategory from './components/dashboard/category/AddCategory';
// import EditCategory from './components/dashboard/category/EditCategory';

// import SubCategoryList from './components/dashboard/sub-category'
// import AddSubCategory from './components/dashboard/sub-category/AddSubCategory';
// import EditSubCategory from './components/dashboard/sub-category/EditSubCategory';

// import CustomerList from './components/dashboard/customer'
// import AddCustomer from './components/dashboard/customer/AddCustomer';
// import EditCustomer from './components/dashboard/customer/EditCostmer';
// import PostList from './components/dashboard/blog';
// import ChangePassword from "./components/dashboard/change-password";

// import OrderList from "./components/dashboard/order"
// import LogoList from './components/dashboard/logo';
// import AddLogo from './components/dashboard/logo/AddLogo';
// import EditLogo from './components/dashboard/logo/EditLogo';

// import ListBanners from "./components/dashboard/banner/ListBanners";
// import AddBanner from "./components/dashboard/banner/AddBanner";
// import EditBanner from "./components/dashboard/banner/EditBanner";
// import Country from './components/dashboard/location/country'
// import AddCountry from "./components/dashboard/location/country/AddCountry";
// import EditCountry from "./components/dashboard/location/country/EditCountry";

// import StateList from './components/dashboard/location/state';
// import AddState from './components/dashboard/location/state/AddState';
// import EditState from './components/dashboard/location/state/EditState';

// import CityList from './components/dashboard/location/city';
// import AddCity from './components/dashboard/location/city/AddCity';
// import EditCity from './components/dashboard/location/city/EditCity';

// import ProductList from './components/dashboard/product';
// import AddProduct from './components/dashboard/product/AddProduct';
// import EditProduct from './components/dashboard/product/EditProduct';




// function App() {


//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="about" element={<About />} />

//           <Route path="login" element={<Login />} />
//           {/* <Route element={<AuthLayout />}>
//             <Route path="login" element={<Login />} />
//             <Route path="register" element={<Register />} />
//           </Route> */}
//           <Route path='/dashboard' element={<ProtectUser />} >

//             <Route path="" element={<Dashboard />}>
//               <Route path="" element={<Summery />} />

//               <Route path="logo-list" element={<LogoList />} />
//               <Route path="add-logo" element={<AddLogo />} />
//               <Route path="edit-logo/:id" element={<EditLogo />} />
//               <Route path="banner-list" element={<ListBanners />} />
//               <Route path="add-banner" element={<AddBanner />} />
//               <Route path="edit-banner/:id" element={<EditBanner />} />

//               <Route path="country-list" element={<Country />} />
//               <Route path="add-country" element={<AddCountry />} />
//               <Route path="edit-country/:id" element={<EditCountry />} />

//               <Route path="state-list" element={<StateList />} />
//               <Route path="add-state" element={<AddState />} />
//               <Route path="edit-state/:id" element={<EditState />} />

//               <Route path="city-list" element={<CityList />} />
//               <Route path="add-city" element={<AddCity />} />
//               <Route path="edit-city/:id" element={<EditCity />} />


//               <Route path="category-list" element={<CategoryList />} />
//               <Route path="add-category" element={<AddCategory />} />
//               <Route path="edit-category/:id" element={<EditCategory />} />

//               <Route path="sub-category-list" element={<SubCategoryList />} />
//               <Route path="add-sub-category" element={<AddSubCategory />} />
//               <Route path="edit-sub-category/:id" element={<EditSubCategory />} />

//               <Route path="product-list" element={<ProductList />} />
//               <Route path="add-product" element={<AddProduct />} />
//               <Route path="edit-product/:id" element={<EditProduct />} />

//               <Route path="customer-list" element={<CustomerList />} />
//               <Route path="add-customer" element={<AddCustomer />} />
//               <Route path="edit-customer/:id" element={<EditCustomer />} />
//               <Route path="change-password" element={<ChangePassword />} />
//               <Route path="order-list" element={<OrderList />} />


//               <Route path="post-list" element={<PostList />} />

//             </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>

//     </>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home';
import About from './pages/About';
// import AuthLayout from './pages/AuthLayout';
import Login from './pages/Login';
// import Register from './pages/Register';
import ProtectUser from "./utils/ProtectUser";
import Dashboard from './pages/Dashboard';
import Summery from "./components/dashboard/summery";
import CategoryList from './components/dashboard/category'
import AddCategory from './components/dashboard/category/AddCategory';
import EditCategory from './components/dashboard/category/EditCategory';

import SubCategoryList from './components/dashboard/sub-category'
import AddSubCategory from './components/dashboard/sub-category/AddSubCategory';
import EditSubCategory from './components/dashboard/sub-category/EditSubCategory';

import CustomerList from './components/dashboard/customer'
import AddCustomer from './components/dashboard/customer/AddCustomer';
import EditCustomer from './components/dashboard/customer/EditCostmer';
import PostList from './components/dashboard/blog';
import ChangePassword from "./components/dashboard/change-password";

import OrderList from "./components/dashboard/order"
import LogoList from './components/dashboard/logo';
import AddLogo from './components/dashboard/logo/AddLogo';
import EditLogo from './components/dashboard/logo/EditLogo';

import ListBanners from "./components/dashboard/banner/ListBanners";
import AddBanner from "./components/dashboard/banner/AddBanner";
import EditBanner from "./components/dashboard/banner/EditBanner";
import Country from './components/dashboard/location/country'
import AddCountry from "./components/dashboard/location/country/AddCountry";
import EditCountry from "./components/dashboard/location/country/EditCountry";

import StateList from './components/dashboard/location/state';
import AddState from './components/dashboard/location/state/AddState';
import EditState from './components/dashboard/location/state/EditState';

import CityList from './components/dashboard/location/city';
import AddCity from './components/dashboard/location/city/AddCity';
import EditCity from './components/dashboard/location/city/EditCity';

import ProductList from './components/dashboard/product';
import AddProduct from './components/dashboard/product/AddProduct';
import EditProduct from './components/dashboard/product/EditProduct';
import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Products from "./components/dashboard/product/Products";
import Checkout from "./components/dashboard/checkout";
import Cart from "./components/dashboard/cart";
import CartProducts from "./components/dashboard/cart/CartProducts";
import OrderCompletePage from "./components/dashboard/order/OrderComplete";
import MyOrder from './components/dashboard/order/MyOrder';
import OrderDetails from "./components/dashboard/order/OrderDetail";

import StockList from "./components/dashboard/stock";

import EmployeeList from "./components/dashboard/employee/List";
import EditEmployee from "./components/dashboard/employee/Edit";
import AddEmployee from "./components/dashboard/employee/Add";
import MyOrderDetail from "./components/dashboard/order/MyOrderDetail";
import SaleService from "./components/dashboard/billing/sale-service";
import PurchaseEntry from "./components/dashboard/billing/purchase";
import SaleReturn from "./components/dashboard/billing/sale-return";
import PurchaseReturn from "./components/dashboard/billing/purchase-return";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />

        {/* Allow all roles to access the Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin", "employee", "customer"]} />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Summery />} /> {/* Show summary to everyone */}

            {/* Customers can only see Dashboard & Change Password */}
            <Route element={<ProtectedRoute allowedRoles={["customer", "employee", "admin"]} />}>
              <Route path="change-password" element={<ChangePassword />} />
            </Route>

            {/* Admin & Employee Only */}
            <Route element={<ProtectedRoute allowedRoles={["admin", "employee"]} />}>
              {/* <Route path="products" element={<Products />} /> */}
              <Route path="cart-products" element={<CartProducts />} />

              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-complete/:id" element={<OrderCompletePage />} />
              <Route path="my-orders" element={<MyOrder />} />
              <Route path="my-order-detail/:id" element={<MyOrderDetail />} />


              <Route path="customer-list" element={<CustomerList />} />
              <Route path="add-customer" element={<AddCustomer />} />
              <Route path="edit-customer/:id" element={<EditCustomer />} />

              <Route path="employee-list" element={<EmployeeList />} />
              <Route path="add-employee" element={<AddEmployee />} />
              <Route path="edit-employee/:id" element={<EditEmployee />} />
              <Route path="sale-service-entry" element={<SaleService />} />
              <Route path="purchase-entry" element={<PurchaseEntry />} />
              <Route path="sale-return" element={<SaleReturn />} />
              <Route path="purchase-return" element={<PurchaseReturn />} />

            </Route>

            {/* Admin Only */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="logo-list" element={<LogoList />} />
              <Route path="add-logo" element={<AddLogo />} />
              <Route path="edit-logo/:id" element={<EditLogo />} />
              <Route path="banner-list" element={<ListBanners />} />
              <Route path="add-banner" element={<AddBanner />} />
              <Route path="edit-banner/:id" element={<EditBanner />} />

              <Route path="country-list" element={<Country />} />
              <Route path="add-country" element={<AddCountry />} />
              <Route path="edit-country/:id" element={<EditCountry />} />

              <Route path="state-list" element={<StateList />} />
              <Route path="add-state" element={<AddState />} />
              <Route path="edit-state/:id" element={<EditState />} />

              <Route path="city-list" element={<CityList />} />
              <Route path="add-city" element={<AddCity />} />
              <Route path="edit-city/:id" element={<EditCity />} />


              <Route path="category-list" element={<CategoryList />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="edit-category/:id" element={<EditCategory />} />

              <Route path="sub-category-list" element={<SubCategoryList />} />
              <Route path="add-sub-category" element={<AddSubCategory />} />
              <Route path="edit-sub-category/:id" element={<EditSubCategory />} />

              <Route path="product-list" element={<ProductList />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />

              <Route path="stock-history" element={<StockList />} />

              <Route path="customer-list" element={<CustomerList />} />
              <Route path="add-customer" element={<AddCustomer />} />
              <Route path="edit-customer/:id" element={<EditCustomer />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="order-list" element={<OrderList />} />
              <Route path="order-details/:id" element={<OrderDetails />} />


              <Route path="post-list" element={<PostList />} />
            </Route>

          </Route>
        </Route>
        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 404 Page for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
