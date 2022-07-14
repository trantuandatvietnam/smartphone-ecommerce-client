import axiosClient from './axiosClient';
const orderApis = {
    getOrder: (token) => {
        const url = 'api/orders';
        return axiosClient.get(url, { headers: { Authorization: token } });
    },
    getOrders: (token) => {
        const url = 'api/get_all_orders';
        return axiosClient.get(url, { headers: { Authorization: token } });
    },
    createOrder: (token, newOrder) => {
        const url = 'api/orders';
        return axiosClient.post(url, newOrder, { headers: { Authorization: token } });
    },
    updateOrder: (token, orderId, fieldUpdate) => {
        const url = `api/orders/${orderId}`;
        return axiosClient.patch(url, fieldUpdate, { headers: { Authorization: token } });
    },
};

export default orderApis;
