import React, { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import authApis from '../../../apis/authApis';
import orderApis from '../../../apis/orderApis';
import { Address } from '../../../constructor/Address';
import { updateInfoUser } from '../../../redux/slice/authSlice';
import { updateToast } from '../../../redux/slice/toastMessageSlice';
import discountPrice from '../../../ultis/discountPrice';

const InfoUserBought = ({ productSelect }) => {
    // data from store
    const { token } = useSelector((state) => state.auth);
    const { address, cart } = useSelector((state) => state.auth.infoUser);
    // state
    const [cartFormOptions, setCartFormOptions] = useState({
        customerGender: 'male',
        receiver: '',
        address: new Address(
            address[0]?.descriptionAddress,
            address[0]?.ward,
            address[0]?.district,
            address[0]?.city
        ).getAddress(),
        delivery: 'giao tận nơi',
    });
    // hooks
    const dispatch = useDispatch();

    const handleChangeBuyerInfo = (e) => {
        const value = e.target.value;
        setCartFormOptions({ ...cartFormOptions, [e.target.name]: value });
    };

    const handleClickConfirmBought = async () => {
        // validate
        if (!cartFormOptions.receiver || productSelect.length === 0) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: 'Vui lòng điền đầy đủ thông tin!',
                })
            );
            return;
        }

        dispatch(
            updateToast({
                delay: 5000,
                isShowToast: true,
                type: 'success',
                message: 'Mua hàng thành công!',
            })
        );
        const newOrder = {
            cartFormOptions,
            productSelect,
            total: totalPrice(productSelect),
        };
        try {
            const newCart = [...cart];
            // delete product in cart after bought
            newOrder.productSelect.forEach((currentProduct) => {
                const index = newCart.findIndex((item) => item.product._id === currentProduct.product._id);
                newCart.splice(index, 1);
            });
            // update cart after bought
            dispatch(updateInfoUser({ cart: newCart }));
            const serverUpdateUserInfo = authApis.updateUserInfo(token, { fieldsUpdate: { cart: newCart } });
            const serverUpdateOrder = orderApis.createOrder(token, { productOrder: newOrder });
            await Promise.all([serverUpdateUserInfo, serverUpdateOrder]);
            window.location = '/order';
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

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

    return (
        <div>
            <div className="flex flex-col gap-y-8">
                <div>
                    <span>Thông tin khách hàng</span>
                </div>
                <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <input
                            onChange={handleChangeBuyerInfo}
                            className="cursor-pointer"
                            name="customerGender"
                            type="radio"
                            value="male"
                            checked={cartFormOptions.customerGender === 'male'}
                        />
                        <span>Anh</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <input
                            checked={cartFormOptions.customerGender === 'female'}
                            onChange={handleChangeBuyerInfo}
                            name="customerGender"
                            type="radio"
                            value="female"
                        />
                        <span>Chị</span>
                    </div>
                </div>
                <div>
                    {!cartFormOptions.receiver && (
                        <div className="flex items-center text-error gap-x-4">
                            <i className="bx bx-info-circle"></i>
                            <span className=" text-[1.4rem]">Bạn chưa điền trường này!</span>
                        </div>
                    )}
                    <div>
                        <input
                            className="shadow-md cursor outline-none w-full px-8 py-4 bg-white"
                            type="text"
                            placeholder="Người nhận"
                            name="receiver"
                            onChange={handleChangeBuyerInfo}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-y-8">
                    <div className="flex flex-col gap-y-4">
                        <span className="block">Địa chỉ</span>
                        <div className="flex items-center gap-x-4 text-[1.4rem]">
                            <span>Nếu bạn muốn cập nhật địa chỉ của bạn bấm</span>
                            <Link to="/user_info" className="text-blue-link">
                                Thay đổi
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-8">
                        {address.map((ad, index) => (
                            <div key={index} className="flex items-center gap-x-4">
                                <input
                                    type="radio"
                                    name="address"
                                    value={new Address(
                                        ad?.descriptionAddress,
                                        ad?.ward,
                                        ad?.district,
                                        ad?.city
                                    ).getAddress()}
                                    onChange={handleChangeBuyerInfo}
                                    checked={
                                        new Address(
                                            ad?.descriptionAddress,
                                            ad?.ward,
                                            ad?.district,
                                            ad?.city
                                        ).getAddress() === cartFormOptions.address
                                    }
                                />
                                <label htmlFor="">
                                    {new Address(ad?.descriptionAddress, ad?.ward, ad?.district, ad?.city).getAddress()}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="mb-8">
                        <span>Chọn hình thức giao hàng</span>
                    </div>
                    <div className="flex items-center gap-x-4 mb-4">
                        <input
                            onChange={handleChangeBuyerInfo}
                            checked={cartFormOptions.delivery === 'giao tận nơi'}
                            name="delivery"
                            id="receive_one"
                            type="radio"
                            value="giao tận nơi"
                        />
                        <label htmlFor="receive_one ">Giao tận nơi</label>
                    </div>
                    <div className="flex items-center gap-x-4 mb-4">
                        <input
                            onChange={handleChangeBuyerInfo}
                            name="delivery"
                            checked={cartFormOptions.delivery === 'Nhận tại siêu thị'}
                            id="delivery_two"
                            type="radio"
                            value="Nhận tại siêu thị"
                        />
                        <label htmlFor="delivery_two">Nhận tại siêu thị</label>
                    </div>
                </div>
                <div className="text-right">
                    <div onClick={handleClickConfirmBought} className="btn inline-flex items-center">
                        Xác nhận mua
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(InfoUserBought);
