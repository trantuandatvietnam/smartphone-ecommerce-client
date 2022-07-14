import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    return (
        <div className=" bg-yellow-primary dark:bg-dark_category_bg">
            <div className="wrapper">
                <ul className="flex items-center mb-[2rem] overflow-auto">
                    {category?.length &&
                        category?.map((cate, index) => (
                            <li key={index}>
                                <Link
                                    className="p-4 flex items-center justify-center text-black gap-4 hover:opacity-80"
                                    to={`/products/${cate?.pathname}`}
                                >
                                    {cate?.icon && <i className={`${cate?.icon} text-[2rem]`}></i>}
                                    <span className="whitespace-nowrap">{cate?.name}</span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Category;
