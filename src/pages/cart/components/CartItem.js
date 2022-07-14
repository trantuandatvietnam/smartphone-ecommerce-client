import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomInputCheckbox from '../../../components/customInputCheckbox/CustomInputCheckbox';
import { updateInfoUser } from '../../../redux/slice/authSlice';
import { updateConfirm } from '../../../redux/slice/confirmSlice';
import discountPrice from '../../../ultis/discountPrice';
import formatPrice from '../../../ultis/formatPrice';
import ColorUserChooseAgain from './ColorUserChooseAgain';
import QuantityOptionsCart from './QuantityOptionsCart';
import UserChooseOption from './UserChooseOption';

const CartItem = ({ productItem, token, cart, infoUser, onDeleteProductCart }) => {
    // using hook
    const dispatch = useDispatch();

    const clickDeleteProductCart = (productDelete) => {
        dispatch(
            updateConfirm({
                isShow: true,
                status: false,
            })
        );
        onDeleteProductCart(productDelete);
    };

    const handleChangeChecked = () => {
        const newCart = [...cart];
        const newProductSlect = { ...productItem, checked: !productItem.checked };
        const productSelectIndex = newCart.findIndex((item) => item.product._id === productItem.product._id);
        newCart[productSelectIndex] = { ...newProductSlect };
        dispatch(updateInfoUser({ ...infoUser, cart: newCart }));
    };

    const checkChecked = (currentProductCart) => {
        return currentProductCart.checked;
    };

    return (
        <div className="flex w-full gap-x-8 justify-between items-start border-b-2">
            <CustomInputCheckbox checked={checkChecked(productItem)} onChange={handleChangeChecked} />
            <Link
                to={`/products/details/${productItem.product._id}`}
                className="max-w-[10rem] h-max cursor-pointer p-2 border-2 flex items-center justify-center"
            >
                <img src={productItem.product.thumbnail?.url} alt="" />
            </Link>
            <div className="flex-1">
                <Link
                    to={`/products/details/${productItem.product._id}`}
                    className="inline-block cursor-pointer lowercase text-[1.8rem] mb-4 font-medium first-letter:uppercase"
                >
                    {productItem.product.productName}
                </Link>
                {/* user option choose */}
                <div className="flex gap-x-8 flex-wrap gap-y-4">
                    <ColorUserChooseAgain cart={cart} token={token} productItem={productItem} />
                    {productItem.userChoose.option &&
                        Object.keys(productItem.userChoose.option).map((op, index) => (
                            <UserChooseOption cart={cart} key={index} op={op} productItem={productItem} token={token} />
                        ))}
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <div>
                    <span className="font-bold text-[1.4rem] text-red-500">
                        {productItem.product.sale
                            ? formatPrice(discountPrice(productItem.product.price, productItem.product.sale))
                            : formatPrice(productItem.product.price)}
                    </span>
                </div>
                <div>
                    <span
                        onClick={() => clickDeleteProductCart(productItem)}
                        className="text-[1.4rem] font-bold cursor-pointer"
                    >
                        Xóa
                    </span>
                </div>
                <QuantityOptionsCart
                    cart={cart}
                    deleteProductCart={onDeleteProductCart}
                    token={token}
                    productItem={productItem}
                />
            </div>
        </div>
    );
};

export default memo(CartItem);
