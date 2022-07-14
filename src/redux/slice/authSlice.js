import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApis from '../../apis/authApis';

const authInitialState = {
    token: '',
    loading: false,
    isLogged: false,
    isAdmin: false,
    infoUser: null,
};

// redux thunk
// auth/login is type, not path
const authLogin = createAsyncThunk('auth/login', async (loginForm) => {
    try {
        return await authApis.login(loginForm);
    } catch (error) {
        return error.response.data.message;
    }
});
// auth/logout is type, not path
const authLogout = createAsyncThunk('auth/logout', async (token) => {
    return await authApis.logout(token);
});
// auth/register is type, not path
const authRegister = createAsyncThunk('auth/register', async (registerForm) => {
    try {
        return await authApis.register(registerForm);
    } catch (error) {
        return error.response.data.message;
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setInfoUser: (state, action) => {
            state = action.payload;
            return state;
        },
        updateInfoUser: (state, action) => {
            const infoUpdate = action.payload;
            state.infoUser = {
                ...state.infoUser,
                ...infoUpdate,
            };
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        addToCart: (state, action) => {
            state.infoUser.cart = [...state.infoUser.cart, action.payload];
        },
        updateCart: (state, action) => {
            const productCartUpdate = action.payload;
            const indexProductCartUpdate = state.infoUser.cart?.findIndex(
                (item) =>
                    item.product.productName ===
                    productCartUpdate.product.productName
            );
            state.infoUser.cart[indexProductCartUpdate] = productCartUpdate;
        },
        deleteProductCart: (state, action) => {
            const productCartDelete = action.payload;
            const indexProductCartDelete = state.infoUser.cart?.findIndex(
                (item) =>
                    item.product.productName ===
                    productCartDelete.product.productName
            );
            state.infoUser.cart.splice(indexProductCartDelete, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                ({ type }) =>
                    type.startsWith('auth') && type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                }
            )
            .addMatcher(
                ({ type }) =>
                    type.startsWith('auth') && type.endsWith('/fulfilled'),
                (state) => {
                    state.loading = false;
                }
            )
            .addMatcher(
                ({ type }) =>
                    type.startsWith('auth') && type.endsWith('/rejected'),
                (state) => {
                    state.loading = false;
                }
            );
    },
});

const {
    setInfoUser,
    setToken,
    addToCart,
    updateCart,
    deleteProductCart,
    updateInfoUser,
} = authSlice.actions;
const reducer = authSlice.reducer;

export {
    setInfoUser,
    authLogin,
    setToken,
    addToCart,
    authLogout,
    updateCart,
    authInitialState,
    authRegister,
    deleteProductCart,
    updateInfoUser,
};
export default reducer;
