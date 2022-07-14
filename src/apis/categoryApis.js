import axiosClient from './axiosClient';

const categoryApis = {
    getCaterories: () => {
        const url = 'api/category';
        return axiosClient.get(url);
    },
    createCategory: (token, categoryData) => {
        const url = 'api/category';
        return axiosClient.post(url, categoryData, {
            headers: { Authorization: token },
        });
    },
    deleteCategory: (token, id) => {
        const url = `api/category/${id}`;
        return axiosClient.delete(url, {
            headers: { Authorization: token },
        });
    },
    updateCategory: (token, id, updateField) => {
        const url = `api/category/${id}`;
        return axiosClient.patch(url, updateField, {
            headers: { Authorization: token },
        });
    },
};

export default categoryApis;
