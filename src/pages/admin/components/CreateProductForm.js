import { Button } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productApis from '../../../apis/productApis';
import { updateToast } from '../../../redux/slice/toastMessageSlice';
import AddColorForm from './AddColorForm';
import BaseInfoForm from './BaseInfoForm';
import CreateDescProductForm from './CreateDescProductForm';

const CreateProductForm = () => {
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const [newProductData, setNewProductData] = useState({
        productName: '',
        price: 0,
        sale: 0,
        category: '',
        thumbnail: '',
        images: [],
        quantity: 0,
        brand: '',
    });
    const dispatch = useDispatch();

    const handleCreateNewProduct = async () => {
        // validate form
        if (
            newProductData.productName === '' ||
            newProductData.category === '' ||
            newProductData.thumbnail === '' ||
            newProductData.brand === '' ||
            newProductData.images.length === 0
        ) {
            return dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: 'Vui lòng điền tất cả các trường',
                })
            );
        }
        try {
            setLoading(true);
            const res = await productApis.createProduct(token, newProductData);
            setLoading(false);
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'success',
                    message: res.message,
                })
            );
        } catch (error) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: error.response.data.message,
                })
            );
        } finally {
            window.location.reload();
        }
    };
    return (
        <div className="mb-8">
            <div>
                <BaseInfoForm newProductData={newProductData} setNewProductData={setNewProductData} />
                <AddColorForm newProductData={newProductData} setNewProductData={setNewProductData} />
                <CreateDescProductForm newProductData={newProductData} setNewProductData={setNewProductData} />
            </div>
            <div className="text-right">
                <Button disabled={loading} onClick={handleCreateNewProduct} type="primary" danger>
                    {loading ? 'Đang xử lí' : 'Tạo sản phẩm'}
                </Button>
            </div>
        </div>
    );
};

export default CreateProductForm;
