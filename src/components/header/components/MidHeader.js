import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/imgs/logo.png';
import UserLoggedRoute from './UserLoggedRoute';
import UserNotLoggedRoutes from './UserNotLoggedRoutes';

const MidHeader = () => {
    // using hook
    const navigate = useNavigate();
    const { search } = useLocation();

    // data from store
    const { isLogged, infoUser } = useSelector((state) => state.auth);
    const products = useSelector((state) => state.product.products);

    // state
    const [searchValue, setSearchValue] = useState('');

    // function
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        const theFirstProductMatches = products.find((product) => {
            return product.productName.includes(searchValue);
        });
        let categoryMatches = theFirstProductMatches?.category;
        if (!categoryMatches) {
            categoryMatches = 'mobile';
        }
        if (searchValue) navigate(`/products/${categoryMatches}?key=${searchValue.trim()}`);
    };

    useEffect(() => {
        const keySearch = queryString.parse(search).key;
        setSearchValue(keySearch || '');
    }, [search]);

    return (
        <div className="flex items-center justify-between gap-x-4 lg:gap-x-0">
            <Link to="/">
                <img className="w-[5rem] md:w-[8rem]" src={logo} alt="Logo" />
                <div className="w-[5rem] text-[1rem] md:w-[100%] md:text-[1.2rem] text-black dark:text-white">
                    Chi nhánh: <span className="font-bold"> Hà Nội</span>
                </div>
            </Link>
            <form onSubmit={handleSubmitSearch} className="md:flex-1 md:max-w-[50rem] relative">
                <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    className="pl-3 pr-[3rem] dark:text-black py-2 text-[1.2rem] md:text-[1.4rem] bg-white outline-none rounded-md w-full md:py-4 md:pl-4 lg:py-5 lg:pl-5"
                    type="text"
                    placeholder="Bạn cần tìm gì?"
                />
                <button className="flex items-center" type="submit">
                    <i className="bx bx-search dark:text-black text-[1.6rem] md:text-[2rem] absolute right-[1.4rem] top-[50%] translate-y-[-50%] cursor-pointer font-semibold"></i>
                </button>
            </form>
            <div className="flex flex-col justify-center items-center gap-4">
                <ul className="flex items-center justify-between gap-3">
                    {!isLogged ? <UserNotLoggedRoutes /> : <UserLoggedRoute />}
                </ul>
                <Link to="/cart" className="p-1 relative">
                    <i className="text-black dark:text-white bx bx-shopping-bag text-[2rem] md:text-[2rem] cursor-pointer"></i>
                    <span className="absolute text-[1.2rem] text-white font-bold flex items-center justify-center h-[2rem] w-[2rem] rounded-full bg-red-primary top-[-0.5rem] right-[-0.5rem]">
                        {infoUser?.cart?.length}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default MidHeader;
