import { Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import productApis from '../../../apis/productApis';
import discountPrice from '../../../ultis/discountPrice';
import formatPrice from '../../../ultis/formatPrice';
import { updateToast } from '../../../redux/slice/toastMessageSlice';
import uploadApis from '../../../apis/uploadApis';

const ProductCardManager = ({ product, setProductsChecked, productsChecked }) => {
    // using hook
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    // state
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    // function
    const handleClickDetails = (e, product) => {
        e.stopPropagation();
        navigate(`/products/details/${product._id}`);
    };

    const handleChangeChecked = (e) => {
        const index = productsChecked.findIndex((item) => item._id === product._id);

        if (index > -1) {
            const newProductsChecked = [...productsChecked];
            newProductsChecked.splice(index, 1);
            setProductsChecked(newProductsChecked);
        } else {
            setProductsChecked([...productsChecked, product]);
        }
    };

    const checkProductExists = () => {
        const index = productsChecked.findIndex((item) => item._id === product._id);
        return index > -1;
    };

    const handleOkDelete = async () => {
        try {
            setConfirmLoading(true);
            const res = await productApis.deleteProduct(token, product._id);
            await uploadApis.destroy(token, product.thumbnail.public_id);
            const promises = [];
            product.images.forEach(async (color) => {
                const newPromise = uploadApis.destroy(token, color.public_id);
                promises.push(newPromise);
            });
            await Promise.all(promises);
            setConfirmLoading(false);
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'success',
                    message: res.message,
                })
            );
            setIsModalVisible(false);
            window.location.reload();
        } catch (error) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: error.response?.data.message,
                })
            );
        }
    };

    const handleCancelDelete = () => {
        setIsModalVisible(false);
    };

    const onClickDeleteProduct = () => {
        setIsModalVisible(true);
    };

    return (
        <div className="group bg-white flex flex-col relative hover:border-blue-primary cursor-pointer p-6 border-[2px] rounded-[3px] shadow-xl">
            <input
                className="absolute top-4 z-10 left-4"
                onChange={handleChangeChecked}
                checked={checkProductExists()}
                type="checkbox"
            />
            <div className="flex justify-center items-center mb-4">
                <div className="bg-white overflow-hidden w-[17.3rem] h-[17.3rem]">
                    <img
                        onError={(e) =>
                            (e.target.src =
                                'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png')
                        }
                        src={product.thumbnail.url}
                        className="transition-transform group-hover:scale-100 scale-90"
                        alt=""
                    />
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <div className="two-row font-semibold capitalize min-h-[5rem]">{product.productName}</div>
                <div
                    className={`text-[1.4rem] ${
                        product.sale !== 0 ? 'line-through text-gray-500 font-normal' : 'text-red-500 font-semibold'
                    }`}
                >
                    {formatPrice(product.price)}
                </div>
                {product.sale !== 0 && (
                    <div className="text-red-500 font-semibold text-[1.4rem]">
                        {formatPrice(discountPrice(product.price, product.sale))}
                    </div>
                )}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-[1.2rem] text-gray-500">Lượt mua: {product.sold}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-auto">
                    <div
                        onClick={(e) => handleClickDetails(e, product)}
                        className="text-green-500 font-semibold text-[1.4rem]"
                    >
                        Chi tiết
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-8">
                <div onClick={onClickDeleteProduct} className="btn bg-error">
                    Xóa
                </div>
                <div onClick={() => navigate(`/admin/manager/product/edit/${product._id}`)} className="btn">
                    Sửa
                </div>
            </div>
            {product.sale !== 0 && (
                <div className="discount_flag rounded-l-lg absolute top-0 right-[-10px] px-8 py-4 bg-red-500 text-white">
                    {product.sale}% giảm
                </div>
            )}
            <Modal
                cancelText="Bỏ"
                okText="Đồng ý"
                confirmLoading={confirmLoading}
                title="Xác nhận xóa"
                visible={isModalVisible}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
            >
                <span>Bạn có muốn xóa sản phẩm này không?</span>
            </Modal>
        </div>
    );
};

export default ProductCardManager;
