import axiosClient from './axiosClient';
const productApis = {
    getProducts: (params = '') => {
        const url = `api/products${params}`;
        return axiosClient.get(url);
    },
    getProductById: (id) => {
        const url = `api/products/${id}`;
        return axiosClient.get(url);
    },
    createProduct: (token, newProduct) => {
        const url = 'api/products';
        return axiosClient.post(url, newProduct, {
            headers: { Authorization: token },
        });
    },
    updateProduct: (token, productUpdate) => {
        const url = `api/products/${productUpdate._id}`;
        return axiosClient.patch(url, productUpdate, {
            headers: { Authorization: token },
        });
    },
    deleteProduct: (token, productId) => {
        const url = `api/products/${productId}`;
        return axiosClient.delete(url, {
            headers: { Authorization: token },
        });
    },
};

export default productApis;
