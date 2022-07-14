import React from 'react';
import { Link } from 'react-router-dom';
import emptyCart from '../../../../assets/imgs/emptycart.png';

const EmptyCart = () => {
    return (
        <div>
            <div className="text-center mb-4">
                <h3 className="font-semibold text-[3rem] mb-4">Giỏ hàng trống!</h3>
                <Link className="btn inline-flex items-center font-medium" to="/">
                    Bấm vào đây để đến trang sản phẩm
                </Link>
            </div>
            <div className="max-w-[50rem] mx-auto p-4">
                <img src={emptyCart} alt="empty cart" />
            </div>
        </div>
    );
};

export default EmptyCart;
