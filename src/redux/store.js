import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import toastReducer from './slice/toastMessageSlice';
import productReducer from './slice/ProductSlice';
import categoryReducer from './slice/CategorySlice';
import productFilterReducer from './slice/ProductFilterSlice';
import confirmReducer from './slice/confirmSlice';
import orderReducer from './slice/orderSlice';
import darkModeReducer from './slice/darkModeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer,
        category: categoryReducer,
        product: productReducer,
        productFilter: productFilterReducer,
        confirm: confirmReducer,
        orders: orderReducer,
        darkMode: darkModeReducer,
    },
});

export { store };
