

// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './rootReducer'

// const store = configureStore({

//     reducer: rootReducer,
//     middleware: getDefaultMiddleware => {
//         return getDefaultMiddleware({
//             serializableCheck: false
//         })
//     },
//     devTools: true

// })
// export default store


import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { bannerApi } from './features/banner/bannerApi';
import { countryApi } from './features/location/country/countryApi';
import { stateApi } from './features/location/state/stateApi';
import { cityApi } from './features/location/city/cityApi';
import { logoApi } from './features/logo/logoApi';
import { productApi } from './features/product/productApi';
import { categoryApi } from './features/category/categoryApi';
import { cartApi } from "./features/cart/cartApi";
import { orderApi } from './features/order/orderApi';
import { customerApi } from './features/customer/customerApi';


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(bannerApi.middleware)
            .concat(countryApi.middleware)
            .concat(stateApi.middleware)
            .concat(cityApi.middleware)
            .concat(logoApi.middleware)
            .concat(productApi.middleware)
            .concat(categoryApi.middleware)
            .concat(cartApi.middleware)
            .concat(orderApi.middleware)
            .concat(customerApi.middleware),
    devTools: true,
});

export default store;
