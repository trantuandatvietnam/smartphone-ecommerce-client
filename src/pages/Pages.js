import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import authApis from '../apis/authApis';
import categoryApis from '../apis/categoryApis';
import productApis from '../apis/productApis';

import { setInfoUser } from '../redux/slice/authSlice';
import { setCategories } from '../redux/slice/CategorySlice';
import { setProduct } from '../redux/slice/ProductSlice';
import Cart from './cart/Cart';

import Home from './home/Home';
import InfoUser from './infoUser/InfoUser';
import Login from './login/Login';
import PageNotFound from './pageNotFound/pageNotFound';
import ProductDetails from './productDetails/ProductDetails';
import Products from './products/Product';
import Register from './register/Register';
import UserOrder from './userOrder/UserOrder';
import Admin from './admin/Admin';
import UserHistory from './UserHistory';

const Pages = () => {
    // data from store
    const userData = useSelector((state) => state.auth);
    const { token, isLogged, isAdmin } = userData;
    // dispatch
    const dispatch = useDispatch();
    useEffect(() => {
        (async function getInfoUser() {
            try {
                if (token) {
                    const res = await authApis.getUser(token);
                    const user = res.user;
                    dispatch(
                        setInfoUser({
                            ...userData,
                            isLogged: true,
                            isAdmin: user.role === 1,
                            infoUser: user,
                        })
                    );
                }
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        })();
        // eslint-disable-next-line
    }, [token]);

    useEffect(() => {
        (async function getAllCategories() {
            const res = await categoryApis.getCaterories();
            const categories = res.categories;
            dispatch(setCategories(categories));
        })();
    }, [dispatch]);

    useEffect(() => {
        (async function getProducts() {
            const res = await productApis.getProducts();
            dispatch(setProduct(res.products));
        })();
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={isLogged ? <PageNotFound /> : <Login />} />
            <Route path="/register" element={isLogged ? <PageNotFound /> : <Register />} />
            <Route path="/products/:category/*" element={<Products />}></Route>
            <Route path="/products/:category/:sort" element={<Products />}></Route>
            <Route path="/user_info" element={!isLogged ? <PageNotFound /> : <InfoUser />} />
            <Route path="/bought_history" element={isLogged ? <UserHistory /> : <PageNotFound />} />
            <Route path="/products/details/:id" element={<ProductDetails />} />
            <Route path="/cart" element={isLogged ? <Cart /> : <Login />} />
            <Route path="/order" element={<UserOrder />} />
            <Route path="/admin/*" element={isAdmin ? <Admin /> : <PageNotFound />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
};

export default memo(Pages);
