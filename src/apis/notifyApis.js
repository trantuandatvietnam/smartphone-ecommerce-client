import axiosClient from './axiosClient';

const notifyApis = {
    getNotify: () => {
        const url = 'api/notify';
        return axiosClient.get(url);
    },
};

export default notifyApis;
