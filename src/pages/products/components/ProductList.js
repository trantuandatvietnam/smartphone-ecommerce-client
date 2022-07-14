import React from 'react';
import Title from '../../../components/title/Title';
import ProductCard from './ProductCard';

const ProductList = (props) => {
    const { productList, productCardType } = props;
    return (
        <div>
            {productList?.length === 0 ? (
                <Title>Không có sản phẩm nào!</Title>
            ) : (
                <div className={`grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-[2rem]`}>
                    {productList?.map((product) => (
                        <ProductCard type={productCardType} key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
