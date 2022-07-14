import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import productApis from '../../../apis/productApis';
import Loading from '../../../components/loading/Loading';
import { updateToast } from '../../../redux/slice/toastMessageSlice';
import EditAddColorForm from './EditAddColorForm';
import EditBaseInfoForm from './EditBaseInfoForm';
import EditCreateDescProductForm from './EditCreateDescProductForm';

const EditProduct = () => {
    const { id } = useParams();
    // data from store
    const token = useSelector((state) => state.auth.token);
    // state
    const [loading, setLoading] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [productEdit, setProductEdit] = useState(null);
    const dispatch = useDispatch();

    const handleEditProduct = async () => {
        if (
            productEdit.productName === '' ||
            productEdit.category === '' ||
            productEdit.thumbnail === '' ||
            productEdit.brand === '' ||
            productEdit.images.length === 0
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
            setLoadingEdit(true);
            const res = await productApis.updateProduct(token, productEdit);
            setLoadingEdit(false);
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
        }
    };

    useEffect(() => {
        (async function getProductById() {
            setLoading(true);
            const res = await productApis.getProductById(id);
            setLoading(false);
            setProductEdit(res.product);
        })();
    }, [id]);

    return (
        <div>
            {loading && <Loading />}
            <div className="mb-8">
                <div>
                    <EditBaseInfoForm setProductEdit={setProductEdit} productEdit={productEdit} />
                    <EditAddColorForm setProductEdit={setProductEdit} productEdit={productEdit} />
                    <EditCreateDescProductForm setProductEdit={setProductEdit} productEdit={productEdit} />
                </div>
                <div className="text-right">
                    <Button disabled={loadingEdit} onClick={handleEditProduct} type="primary" danger>
                        {loadingEdit ? 'Đang xử lí' : 'Cập nhật thông tin'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
