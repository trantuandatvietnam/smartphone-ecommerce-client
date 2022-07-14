import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authApis from '../../../apis/authApis';
import { updateCart } from '../../../redux/slice/authSlice';
import checkActive from '../../../ultis/checkActive';
import toggleMenu from '../../../ultis/toggleMenu';

const UserChooseOption = ({ op, productItem, token, cart }) => {
    const opBtnRef = useRef(null);
    const opDropdownRef = useRef(null);

    // using hook
    const dispatch = useDispatch();

    // state
    const [loading, setLoading] = useState(false);

    // function
    const handleChooseOptionAgain = async (keyOtion, valueChoose) => {
        const productInCart = cart.find((item) => item.product._id === productItem.product._id);
        const productCartUpdate = {
            ...productInCart,
            userChoose: {
                ...productItem.userChoose,
                option: {
                    ...productItem.userChoose.option,
                    [keyOtion]: valueChoose,
                },
            },
        };
        dispatch(updateCart(productCartUpdate));
        setLoading(true);
        await authApis.updateCart(token, { productCartUpdate: { ...productCartUpdate, checked: false } });
        setLoading(false);
    };

    useEffect(() => {
        // handle toggle menu when user click
        const mouseDownEvent = window.addEventListener('mousedown', (e) => {
            toggleMenu(opBtnRef, opDropdownRef, e.target);
        });
        return () => {
            window.removeEventListener('click', mouseDownEvent);
        };
    }, []);
    return (
        <div ref={opBtnRef} className="relative inline-block">
            <div className="flex items-center justify-center gap-x-1 cursor-pointer">
                <span className="text-[1.4rem] font-semibold">
                    {op}: {productItem.userChoose.option[op]}
                </span>
                <i className="bx bxs-chevron-down"></i>
            </div>
            <ul
                ref={opDropdownRef}
                className="z-10 absolute top-10 right-0 w-full rounded-lg bg-blue-primary shadow-box overflow-hidden scale-y-0 transition-transform origin-top-right"
            >
                {productItem.product.productDescription[op] &&
                    productItem.product.productDescription[op].map((opt, index) => (
                        <button
                            disabled={loading}
                            onMouseDown={() => handleChooseOptionAgain(op, opt)}
                            className={`p-2 block w-full text-left ${
                                checkActive(opt, productItem.userChoose.option[op]) ? 'font-bold text-red-500' : ''
                            } hover:bg-[#72d4ec] cursor-pointer ${!loading ? 'hover:bg-[#72d4ec]' : ''}`}
                            key={index}
                        >
                            {opt}
                        </button>
                    ))}
            </ul>
        </div>
    );
};

export default UserChooseOption;
