import React, { useRef, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import orderApis from '../../../apis/orderApis';
import { authLogout } from '../../../redux/slice/authSlice';
import { setOrders } from '../../../redux/slice/orderSlice';
import toggleMenu from '../../../ultis/toggleMenu';

// menu show
const settingMemu = [
    {
        name: 'Thông tin của bạn',
        path: '/user_info',
    },
    {
        name: 'Đơn đặt hàng',
        path: '/order',
    },
    {
        name: 'lịch sử mua hàng',
        path: '/bought_history',
    },
];

const UserLoggedRoute = () => {
    // using ref
    const settingIcon = useRef(null);
    const settingDropdown = useRef(null);
    // data from store
    const { token, infoUser, isAdmin } = useSelector((state) => state.auth);
    const { orders } = useSelector((state) => state.orders);
    // using hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function
    const handleClickSettingUser = () => {
        settingIcon.current.classList.toggle('rotate-45');
    };

    const handleClickOptionSettings = (item) => {
        navigate(item.path);
    };

    const handleLogout = () => {
        dispatch(authLogout(token));
        localStorage.clear();
        window.location.href = '/';
    };

    useEffect(() => {
        // handle toggle menu when user click
        const mouseDownEvent = window.addEventListener('mousedown', (e) => {
            toggleMenu(settingIcon, settingDropdown, e.target);
        });

        return () => {
            window.removeEventListener('click', mouseDownEvent);
        };
    }, []);

    useEffect(() => {
        (async function getOrders() {
            try {
                const res = await orderApis.getOrder(token);
                dispatch(setOrders(res.orders));
            } catch (error) {
                console.log(error.response.data.messages);
            }
        })();
    }, [token, dispatch]);
    return (
        <>
            <div className="flex items-center justify-center gap-[2rem]">
                <p className="hidden md:block">
                    Xin chào{' '}
                    <span className="text-red-500 font-bold text-[1.4rem]">
                        {infoUser.name || infoUser.email.split('@')[0]}
                    </span>
                </p>
                <div className="fixed z-50 top-4 md:relative flex items-center">
                    <i
                        ref={settingIcon}
                        onClick={handleClickSettingUser}
                        className="bx bx-cog text-[2.4rem] cursor-pointer transition-all"
                    ></i>
                    <ul
                        ref={settingDropdown}
                        className="scale-y-0 z-50 dark:header-shadow origin-top transition-transform absolute rounded-xl top-12 right-0 w-max bg-blue-primary dark:bg-black dark:text-white shadow-lg overflow-hidden"
                    >
                        {isAdmin && (
                            <Link
                                onMouseDown={() => navigate('/admin')}
                                to="/admin"
                                className="px-8 text-black dark:text-white block py-3 cursor-pointer dark:hover:bg-slate-600 hover:bg-blue-hover active:opacity-0"
                            >
                                Quản trị
                            </Link>
                        )}
                        {settingMemu.map((item, index) => (
                            <li
                                onMouseDown={() => handleClickOptionSettings(item)}
                                key={index}
                                className="px-8 flex items-center py-3 cursor-pointer hover:bg-blue-hover dark:hover:bg-slate-600 active:opacity-0"
                            >
                                <Link className="text-black dark:text-white" to={item.path}>
                                    {item.name}
                                </Link>
                                {item.path === '/order' && (
                                    <span className="bg-red-primary ml-4 text-[1.2rem] leading-[2rem] text-center h-[2rem] w-[2rem] text-white inline-block rounded-full">
                                        {orders.length}
                                    </span>
                                )}
                            </li>
                        ))}
                        <li
                            onMouseDown={handleLogout}
                            className="px-8 text-black dark:text-white py-3 cursor-pointer dark:hover:bg-slate-600 hover:bg-blue-hover active:opacity-0"
                        >
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default memo(UserLoggedRoute);
