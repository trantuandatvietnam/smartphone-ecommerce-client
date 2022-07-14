import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import authApis from '../../apis/authApis';
import Confirm from '../../components/confirm/Confirm';
import CustomInputCheckbox from '../../components/customInputCheckbox/CustomInputCheckbox';
import { deleteProductCart, updateInfoUser } from '../../redux/slice/authSlice';
import discountPrice from '../../ultis/discountPrice';
import formatPrice from '../../ultis/formatPrice';
import CartItem from './components/CartItem';
import EmptyCart from './components/emptyCart/EmptyCart';
import InfoUserBought from './components/InfoUserBought';

const Cart = () => {
    // data from store
    const { infoUser, token } = useSelector((state) => state.auth);
    const cart = useMemo(() => {
        return infoUser.cart || [];
    }, [infoUser.cart]);

    const confirmData = useSelector((state) => state.confirm);
    // hook
    const dispatch = useDispatch();

    // state
    const [productSelect, setProductSelect] = useState([]);
    const [total, setTotal] = useState(0);
    /**
     * if it has productCartDelete then delete it
     */
    const [productCartDelete, setProductCartDelete] = useState(null);
    const [selectAll, setSelectAll] = useState(false);

    // function
    const onClickDeleteProductCart = useCallback((productDelete) => {
        setProductCartDelete(productDelete);
    }, []);

    // total money need pay
    const totalPrice = useMemo(() => {
        return (arr) => {
            return arr.reduce((total, curr) => {
                if (curr.product.sale) {
                    return total + curr.userChoose.quantity * discountPrice(curr.product.price, curr.product.sale);
                }
                return total + curr.userChoose.quantity * curr.product.price;
            }, 0);
        };
    }, []);

    const handleCheckedAll = () => {
        const productSlectList = cart.filter((item) => item.checked === true);
        // if all product in cart was check then set checked to equal false
        if (productSlectList.length === cart.length) {
            const newCart = cart.map((item) => {
                const newItem = { ...item, checked: false };
                return newItem;
            });
            dispatch(updateInfoUser({ ...infoUser, cart: newCart }));
        } else {
            // if all product in cart wasnt check then set checked to equal true
            const newCart = cart.map((item) => {
                const newItem = { ...item, checked: true };
                return newItem;
            });
            dispatch(updateInfoUser({ ...infoUser, cart: newCart }));
        }
    };

    useEffect(() => {
        if (confirmData.status && productCartDelete) {
            (async function deleteProductCart() {
                await authApis.deleteProductCart(token, { productCartDelete });
            })();
            dispatch(deleteProductCart(productCartDelete));
        }
    }, [confirmData, productCartDelete, dispatch, token]);

    useEffect(() => {
        const productSlectList = cart.filter((item) => item.checked === true);
        if (productSlectList.length !== cart.length) {
            setSelectAll(false);
        } else {
            setSelectAll(true);
        }
        setProductSelect(productSlectList);
        setTotal(totalPrice(productSlectList));
    }, [cart, totalPrice]);

    return (
        <div className="bg-slate-100 min-h-[calc(100vh-14rem)] pt-[4rem]">
            <div className="wrapper">
                {cart.length !== 0 ? (
                    <div className=" max-w-[80rem] mx-auto">
                        <div className="flex justify-between">
                            <Link to="/" className="mb-4 font-medium flex items-center text-blue-500">
                                <i className="bx bx-left-arrow-alt"></i>
                                <span>Mua thêm các sản phẩm khác</span>
                            </Link>
                            <div>
                                <span className="text-[2rem] font-bold text-blue-500 capitalize">Giỏ hàng của bạn</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-8 py-12 px-8 bg-white mb-[8rem] rounded-lg shadow-md">
                            <div className="flex items-center gap-x-8">
                                <div>
                                    <CustomInputCheckbox
                                        onChange={handleCheckedAll}
                                        checked={selectAll}
                                        label="Chọn tất cả"
                                    />
                                </div>
                            </div>
                            {cart.map((item, index) => (
                                <CartItem
                                    onDeleteProductCart={onClickDeleteProductCart}
                                    cart={cart}
                                    token={token}
                                    key={index}
                                    productItem={item}
                                    infoUser={infoUser}
                                />
                            ))}
                            <div className="flex w-full border-b-2 pb-4 items-center justify-between">
                                {productSelect.length !== 0 ? (
                                    <div>
                                        Tạm tính{' '}
                                        <span className="font-bold text-red-500">
                                            ({productSelect.length} sản phẩm)
                                        </span>
                                        :
                                    </div>
                                ) : (
                                    <div className="text-error flex items-center gap-x-4 text-[1.4rem]">
                                        <i className="bx bx-info-circle "></i> Chọn sản phẩm bạn muốn mua
                                    </div>
                                )}
                                <div>
                                    <span className="font-bold text-green-500">{formatPrice(total)}</span>
                                </div>
                            </div>
                            <InfoUserBought productSelect={productSelect} />
                        </div>
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </div>
            <Confirm>Bạn muốn xóa sản phẩm này khỏi giỏ hàng?</Confirm>
        </div>
    );
};

export default memo(Cart);
