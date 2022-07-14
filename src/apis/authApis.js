import axiosClient from './axiosClient';

const authApis = {
    login: (data) => {
        const url = 'user/login';
        return axiosClient.post(url, data);
    },
    register: (data) => {
        const url = 'user/register';
        return axiosClient.post(url, data);
    },
    logout: (token) => {
        const url = 'user/logout';
        return axiosClient.get(url, {
            headers: { Authorization: token },
        });
    },
    refreshToken: () => {
        const url = 'user/refresh_token';
        return axiosClient.get(url);
    },
    getUser: (token) => {
        const url = 'user/info_user';
        return axiosClient.get(url, {
            headers: { Authorization: token },
        });
    },
    addToCart: (token, data) => {
        const url = 'user/cart';
        return axiosClient.patch(url, data, {
            headers: { Authorization: token },
        });
    },
    updateCart: (token, productCartUpdate) => {
        const url = 'user/cart/update';
        return axiosClient.patch(url, productCartUpdate, {
            headers: { Authorization: token },
        });
    },
    updateUserInfo: (token, fieldUpdate) => {
        const url = 'user/update';
        return axiosClient.patch(url, fieldUpdate, {
            headers: { Authorization: token },
        });
    },
    deleteProductCart: (token, productCartDelete) => {
        const url = 'user/cart/delete';
        return axiosClient.patch(url, productCartDelete, {
            headers: { Authorization: token },
        });
    },
};

export default authApis;
