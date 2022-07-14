import React from 'react';
import { Link } from 'react-router-dom';

const UserNotLoggedRoutes = () => {
    return (
        <>
            <li>
                <Link to="/login" className="text-white text-[1.4rem]">
                    Đăng nhập
                </Link>
            </li>
            <li className="text-[#d1d1d1]">|</li>
            <li>
                <Link to="/register" className="text-white text-[1.4rem]">
                    Đăng ký
                </Link>
            </li>
        </>
    );
};

export default UserNotLoggedRoutes;
