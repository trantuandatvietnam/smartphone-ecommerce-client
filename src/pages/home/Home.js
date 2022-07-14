import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Swipper2 from '../../components/swipper/Swipper2';
import Category from './components/Category';
import PayOnline from './components/payOnline/PayOnline';
import ProductSuggest from './components/ProductSuggest';
import seagames from '../../assets/imgs/seagames.png';
import onlySaleOnline from '../../assets/imgs/onlySaleOnline.png';
import hand from '../../assets/imgs/hand.png';
import saleRootPrice from '../../assets/imgs/saleRootPrice.png';
import { Link } from 'react-router-dom';
import FeaturedCategory from './components/FeaturedCategory';
const bannerNoty = [
    {
        img: onlySaleOnline,
        text: 'Chỉ giảm online',
    },
    {
        img: hand,
        text: 'Giá tốt nhất',
    },
    {
        img: saleRootPrice,
        text: 'Xả hàng giảm sốc',
    },
];
const Home = () => {
    const category = useSelector((state) => state.category.categories);
    return (
        <div className="pb-12 dark:bg-black">
            <Category category={category} />
            <div className="mb-12 lg:mb-[10rem] flex flex-col  md:relative">
                <div className="mb-12 lg:mb-0 lg:min-h-[28rem]">
                    <img src={seagames} alt="" />
                </div>
                <Link
                    to="/products/mobile"
                    className="wrapper w-full items-center lg:w-max left-[50%] p-8 rounded-lg lg:absolute lg:translate-x-[-50%] bottom-0 lg:translate-y-[50%] bg-white grid gap-x-4 grid-cols-1 gap-y-8 md:grid-cols-3 lg:shadow-xl text-gray-500 font-medium"
                >
                    {bannerNoty.map((item, index) => (
                        <div className="flex justify-start gap-x-4 items-center whitespace-nowrap" key={index}>
                            <img className="max-w-[6rem] lg:w-full" src={item.img} alt="" />
                            <span className="text-[2rem]">{item.text}</span>
                        </div>
                    ))}
                </Link>
            </div>
            <Swipper2 />
            <div className="mb-8 mt-12">
                <ProductSuggest />
            </div>
            <div className="mb-8 mt-12">
                <FeaturedCategory />
            </div>
            <PayOnline />
        </div>
    );
};

export default memo(Home);
