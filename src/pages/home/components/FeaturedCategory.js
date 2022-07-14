import React from 'react';
import Title from '../../../components/title/Title';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FeaturedCategory = () => {
    const categories = useSelector((state) => state.category.categories);

    return (
        <div className="wrapper">
            <Title>Danh mục nổi bật</Title>
            <div className="flex p-8 overflow-auto w-full rounded-lg gap-x-12 bg-white">
                {categories?.map((category) => (
                    <Link
                        to={`/products/${category.pathname}`}
                        className="hover:translate-y-[-1rem] transition-transform min-w-[12rem] flex flex-col gap-y-4 items-center"
                        key={category._id}
                    >
                        <img src={category.img.url} alt="" />
                        <div className="font-medium truncate w-full text-center">{category.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCategory;
