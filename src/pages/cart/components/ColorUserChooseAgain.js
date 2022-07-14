import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authApis from '../../../apis/authApis';
import { updateCart } from '../../../redux/slice/authSlice';
import checkActive from '../../../ultis/checkActive';
import toggleMenu from '../../../ultis/toggleMenu';

const ColorUserChooseAgain = ({ productItem, token, cart }) => {
    // using ref
    const colorBtn = useRef(null);
    const colorDropdownRef = useRef(null);

    // using dispatch
    const dispatch = useDispatch();

    // state
    const [loading, setLoading] = useState(false);

    // function
    const handleChooseColorAgain = async (colorChoose) => {
        const productInCart = cart.find((item) => item.product._id === productItem.product._id);
        const productCartUpdate = {
            ...productInCart,
            userChoose: {
                ...productItem.userChoose,
                color: colorChoose,
            },
        };

        dispatch(updateCart(productCartUpdate));
        setLoading(true);
        // checked only using on client
        await authApis.updateCart(token, { productCartUpdate: { ...productCartUpdate, checked: false } });
        setLoading(false);
    };

    useEffect(() => {
        // handle toggle menu when user click
        const mouseDownEvent = window.addEventListener('mousedown', (e) => {
            toggleMenu(colorBtn, colorDropdownRef, e.target);
        });
        return () => {
            window.removeEventListener('click', mouseDownEvent);
        };
    }, []);

    return (
        <div ref={colorBtn} className="relative">
            <div className="flex items-center justify-center gap-x-1 cursor-pointer">
                <span className="text-[1.4rem] font-semibold">Màu: {productItem.userChoose.color}</span>
                <i className="bx bxs-chevron-down"></i>
            </div>
            <div
                ref={colorDropdownRef}
                className={`z-10 absolute top-10 right-0 rounded-lg bg-blue-primary shadow-box overflow-hidden scale-y-0 transition-transform origin-top-right ${
                    loading ? 'bg-slate-200' : ''
                }`}
            >
                {productItem.product.images.map((img, index) => (
                    <button
                        disabled={loading}
                        onMouseDown={() => handleChooseColorAgain(img.color)}
                        className={` px-8 py-2 whitespace-nowrap w-full text-left ${
                            checkActive(img.color, productItem.userChoose.color) ? 'font-bold text-red-500' : ''
                        }  cursor-pointer ${!loading ? 'hover:bg-[#72d4ec]' : ''}`}
                        key={index}
                    >
                        {img.color}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ColorUserChooseAgain;
