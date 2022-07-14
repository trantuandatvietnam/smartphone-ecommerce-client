import { Tabs } from 'antd';
import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
const { TabPane } = Tabs;

const tabMenuData = [
    {
        id: 1,
        path: '/admin',
        content: 'Quản lí sản phẩm',
    },
    {
        id: 2,
        path: '/admin/manager/categories',
        content: 'Quản lí danh mục',
    },
    {
        id: 3,
        path: '/admin/manager/order',
        content: 'Quản lí đơn hàng',
    },
];

const TabMenu = () => {
    const navigate = useNavigate();
    const currentPath = useParams();

    const onChange = (path) => {
        navigate(path);
    };

    return (
        <div>
            <div className="dark:bg-white h-max mb-12 p-4">
                <Tabs defaultActiveKey={'/admin/' + currentPath['*']} onChange={onChange}>
                    {tabMenuData.map((tab) => (
                        <TabPane tab={tab.content} key={tab.path}></TabPane>
                    ))}
                </Tabs>
            </div>
            <Outlet />
        </div>
    );
};

export default TabMenu;
