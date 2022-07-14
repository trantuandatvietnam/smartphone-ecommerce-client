import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Title from '../../../components/title/Title';

const SideBarLeft = () => {
    // categori is params on path
    const { category } = useParams();
    const categories = useSelector((state) => state.category.categories);
    const [brandProduct, setBrandProduct] = useState([]);

    useEffect(() => {
        if (categories.length === 0) return;
        const brand = categories.find((item) => item.pathname === category)?.brand;
        setBrandProduct(brand);
    }, [categories, category]);

    return (
        <div
            id="category_button"
            className="fixed  left-0 top-[22rem] transition-all translate-x-[-100%] md:translate-x-[0] z-50 md:sticky md:top-4 bg-blue-primary inline-block p-8 rounded-lg min-w-[18rem] h-screen shadow-xl"
        >
            <Title>
                <i className="bx bx-category"></i>
                Thể loại
            </Title>
            <ul className="flex flex-col gap-y-4">
                <li className="w-full relative cursor-pointer after:absolute after:z-[-1] after:top-0 after:h-full after:w-full after:block after:border-b-2 after:content-['']">
                    <Link
                        to=""
                        className="font-medium text-black p-2 translate-x-2 uppercase hover:translate-x-4 transition-transform block"
                    >
                        Tất cả sảm phẩm
                    </Link>
                </li>
                {brandProduct &&
                    brandProduct.map((brand) => (
                        <li
                            className="w-full relative cursor-pointer after:absolute after:z-[-1] after:top-0 after:h-full after:w-full after:block after:border-b-2 after:content-['']"
                            key={brand}
                        >
                            <Link
                                to={`?brand=${brand}`}
                                className="font-medium text-black p-2 translate-x-2 uppercase hover:translate-x-4 transition-transform block"
                            >
                                {brand}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default SideBarLeft;
