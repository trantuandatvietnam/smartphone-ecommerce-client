import axiosClient from './axiosClient';

const uploadApis = {
    uploadImage: (token, files) => {
        const url = 'api/upload';
        return axiosClient.post(url, files, {
            headers: { Authorization: token, 'Content-Type': 'mutipart/form-data' },
        });
    },
    destroy: (token, public_id) => {
        const url = 'api/destroy';
        return axiosClient.post(url, { public_id }, { headers: { Authorization: token } });
    },
};

export default uploadApis;
