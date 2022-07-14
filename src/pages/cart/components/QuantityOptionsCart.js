import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authApis from '../../../apis/authApis';
import { updateCart } from '../../../redux/slice/authSlice';
import { updateConfirm } from '../../../redux/slice/confirmSlice';

const QuantityOptionsCart = ({ productItem, token, deleteProductCart, cart }) => {
    // using hooks
    const dispatch = useDispatch();
    const productInCart = cart.find((item) => item.product._id === productItem.product._id);
    // state
    const [loading, setLoading] = useState(false);

    // function
    const handleDecreaseQuantity = async () => {
        // if quantity to equal 1 but user want continue to decrease quantity then delete it from cart
        if (productItem.userChoose.quantity - 1 === 0) {
            dispatch(
                updateConfirm({
                    isShow: true,
                    status: false,
                })
            );
            deleteProductCart(productItem);
            return;
        }
        // decrease quantity when user wants to decrease quantity
        const productCartUpdate = {
            ...productInCart,
            userChoose: {
                ...productItem.userChoose,
                quantity:
                    productItem.userChoose.quantity >= 2
                        ? productItem.userChoose.quantity - 1
                        : productItem.userChoose.quantity,
            },
        };
        dispatch(updateCart(productCartUpdate));
        setLoading(true);
        await authApis.updateCart(token, { productCartUpdate: { ...productCartUpdate, checked: false } });
        setLoading(false);
    };
    const handleIncreaseQuantity = async () => {
        const productCartUpdate = {
            ...productInCart,
            userChoose: {
                ...productItem.userChoose,
                quantity: productItem.userChoose.quantity + 1,
            },
        };
        dispatch(updateCart(productCartUpdate));
        setLoading(true);
        await authApis.updateCart(token, { productCartUpdate: { ...productCartUpdate, checked: false } });
        setLoading(false);
    };

    return (
        <div className={`inline-flex items-center justify-center border-2 mb-4 ${loading ? 'text-gray-200' : ''}`}>
            <button
                onClick={handleDecreaseQuantity}
                className="p-3 flex items-center justify-center cursor-pointer"
                disabled={loading}
            >
                <i className="bx bx-minus text-[2rem] font-bold"></i>
            </button>
            <div className="p-3 flex items-center justify-center border-x-2">
                <span>{productItem.userChoose.quantity}</span>
            </div>
            <button
                disabled={loading}
                onClick={handleIncreaseQuantity}
                className="p-3 flex items-center justify-center cursor-pointer"
            >
                <i className="bx bx-plus text-[2rem] font-bold"></i>
            </button>
        </div>
    );
};

export default QuantityOptionsCart;
