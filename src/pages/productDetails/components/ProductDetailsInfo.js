import React, { useEffect, useState } from 'react';

const ProductDetailsInfo = ({ product }) => {
    const [productCongfig, setProductConfig] = useState([]);
    useEffect(() => {
        if (!product.productDescription) return;
        setProductConfig(Object.keys(product.productDescription));
    }, [product.productDescription]);

    return (
        <div className="bg-white">
            <h3 className="font-semibold text-[2rem] bg-slate-300 px-8 py-4">Thông số</h3>
            <div className="p-8">
                <div>
                    {productCongfig.length !== 0 ? (
                        productCongfig.map((item, index) => (
                            <div key={index} className="mb-4 border-2 p-4">
                                <div className="p-4 capitalize bg-slate-200 font-bold mb-4">{item}</div>
                                <div className="pl-4">
                                    {Array.isArray(product.productDescription[item])
                                        ? product.productDescription[item].join(', ')
                                        : product.productDescription[item]}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Đang cập nhật ... </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsInfo;
