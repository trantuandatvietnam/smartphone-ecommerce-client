import React from 'react';
import 'antd/dist/antd.css';

import Title from '../../components/title/Title';
import TabMenu from './components/TabManager';
import { Route, Routes } from 'react-router-dom';
import ProductsManager from './components/ProductsManager';
import CategoryManager from './components/CategoryManager';
import OrderManager from './components/OrderManager';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';

const Admin = () => {
    return (
        <div className="wrapper py-8 min-h-screen">
            <div>
                <Title>Admin</Title>
                <Routes>
                    <Route path="/" element={<TabMenu />}>
                        <Route index element={<ProductsManager />} />
                        <Route path="/manager/product/create" element={<CreateProduct />} />
                        <Route path="/manager/product/edit/:id" element={<EditProduct />} />
                        <Route path="/manager/categories" element={<CategoryManager />} />
                        <Route path="/manager/order" element={<OrderManager />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default Admin;
