import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Title from '../../../components/title/Title';
import ProductList from '../../products/components/ProductList';

const ProductSuggest = () => {
    const producData = useSelector((state) => state.product);
    const [productSale, setProductSale] = useState([]);
    useEffect(() => {
        const products = producData?.products?.filter((product) => product.sale !== 0);
        setProductSale(products);
    }, [producData.products]);
    return (
        <div className="wrapper">
            <Title>Sản phẩm đang khuyến mãi</Title>
            {productSale?.length !== 0 ? (
                <ProductList productList={productSale} col={5} />
            ) : (
                <div className="pl-4">
                    <span className="text-error font-medium">Hiện chưa có sản phẩm nào đang được khuyến mãi!</span>
                </div>
            )}
        </div>
    );
};

export default ProductSuggest;
