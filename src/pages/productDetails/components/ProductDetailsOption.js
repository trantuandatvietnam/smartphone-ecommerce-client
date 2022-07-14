import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductColorsOptions from './ProductColorsOptions';
import ProductOptionsQuantity from './ProductOptionsQuantity';
import ProductUserOptions from './ProductUserOptions';
import { updateToast } from '../../../redux/slice/toastMessageSlice';
import { addToCart } from '../../../redux/slice/authSlice';
import authApis from '../../../apis/authApis';
import { useNavigate } from 'react-router-dom';

const ProductDetailsOption = ({ product }) => {
    // data from store
    const { infoUser, token, isLogged } = useSelector((state) => state.auth);
    const cart = infoUser?.cart;

    // all options
    const [options, setOptions] = useState([]);

    // user choose
    const [quantity, setQuantity] = useState(0);
    const [userOptions, setUserOptions] = useState(null);
    const [userColor, setUserColor] = useState('');

    // using hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function
    const handleClickAddToCart = async () => {
        // if user is not login then navigate user to login page
        if (!isLogged) {
            navigate('/login');
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: 'Cần đăng nhập để thực hiện chức năng này!',
                })
            );
            return;
        }

        if (product.quantity === 0) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: 'Sản phẩm này không còn hàng! Vui lòng quay lại sau',
                })
            );
            return;
        }
        if (!userColor) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: 'Vui lòng nhập màu săc bạn muốn mua!',
                })
            );

            return;
        }

        if (quantity === 0) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: 'Vui lòng nhập số lượng hàng bạn cần mua!',
                })
            );
            return;
        }
        if (userOptions && Object.keys(userOptions).length !== options.length) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: 'Nhập lựa chọn trước khi mua!',
                })
            );

            return;
        }

        const productBoughtInfo = {
            product: product,
            userChoose: {
                quantity,
                color: userColor,
                option: userOptions,
            },
            checked: false,
        };
        const existProductCart = cart.find((item) => item.product._id === productBoughtInfo.product._id);
        if (existProductCart) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: 'Sản phẩm này đã tồn tại trong giỏ!',
                })
            );
            return;
        } else {
            await authApis.addToCart(token, {
                cart: [...cart, productBoughtInfo],
            });
            dispatch(addToCart(productBoughtInfo));
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'success',
                    message: 'Đã thêm sản phẩm vào giỏ hàng, Vào giỏ hàng để hoàn tất đặt hàng!',
                })
            );
        }
    };

    useEffect(() => {
        if (!product.productDescription) return;
        const options = Object.keys(product?.productDescription).filter(
            (key) => product.productDescription[key].constructor === Array
        );
        setOptions(options);
    }, [product.productDescription]);
    return (
        <div>
            <ProductColorsOptions product={product} setUserColor={setUserColor} userColor={userColor} />
            <ProductUserOptions
                options={options}
                product={product}
                userOptions={userOptions}
                setUserOptions={setUserOptions}
            />
            <ProductOptionsQuantity quantity={quantity} setQuantity={setQuantity} product={product} />
            <button onClick={handleClickAddToCart} className="btn w-max text-[1.4rem] font-medium">
                Thêm vào giỏ hàng
            </button>
        </div>
    );
};

export default memo(ProductDetailsOption);
