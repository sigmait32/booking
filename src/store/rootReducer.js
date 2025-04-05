// import authReducer from "./reducers/authReducer";
// import categoryReducer from './reducers/categoryReducer';
// import subCategoryReducer from './reducers/subCategoryReducer';
// import customerReducer from './reducers/customerReducer';
// import logoReducer from './reducers/logoReducer';
// import postsReducer from './features/post/postSlice';



// const rootReducer = {
//     auth: authReducer,
//     posts: postsReducer,
//     category: categoryReducer,
//     subCategories: subCategoryReducer,
//     customers: customerReducer,
//     logos: logoReducer,
// }
// export default rootReducer;


import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import categoryReducer from './reducers/categoryReducer';
import subCategoryReducer from './reducers/subCategoryReducer';
import customerReducer from './reducers/customerReducer';
import logoReducer from './reducers/logoReducer';
import postsReducer from './features/post/postSlice';
import { bannerApi } from './features/banner/bannerApi'; // Import bannerApi
import { countryApi } from './features/location/country/countryApi'; // Import bannerApi
import { stateApi } from './features/location/state/stateApi';
import { cityApi } from './features/location/city/cityApi'
import { logoApi } from './features/logo/logoApi';
import { productApi } from './features/product/productApi';
import { categoryApi } from './features/category/categoryApi';
import cartReducer from "./features/cart/cartSlice";
import { cartApi } from "./features/cart/cartApi";
import { orderApi } from './features/order/orderApi';
import { customerApi } from './features/customer/customerApi';
import { dashboardApi } from './features/dashboard/dashboardApi';
import { employeeApi } from './features/employee/employeeApi';
const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    category: categoryReducer,
    subCategories: subCategoryReducer,
    customers: customerReducer,
    logos: logoReducer,
    cart: cartReducer,
    [bannerApi.reducerPath]: bannerApi.reducer, // Add bannerApi reducer
    [countryApi.reducerPath]: countryApi.reducer,
    [stateApi.reducerPath]: stateApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [logoApi.reducerPath]: logoApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
});

export default rootReducer;