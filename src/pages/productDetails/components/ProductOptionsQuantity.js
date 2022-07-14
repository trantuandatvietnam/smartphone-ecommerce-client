import React from 'react';

const ProductOptionsQuantity = ({ quantity, setQuantity, product }) => {
    const decreseCountQuantity = () => {
        if (quantity >= 1) {
            setQuantity((prev) => prev - 1);
        }
    };
    const increaseCountQuantity = () => {
        setQuantity((prev) => {
            if (product.quantity >= prev + 1) {
                return prev + 1;
            }
            return prev;
        });
    };
    return (
        <div className="inline-flex items-center border-2 mb-4">
            <div onClick={decreseCountQuantity} className="p-3 flex items-center justify-center cursor-pointer">
                <i className="bx bx-minus text-[2rem] font-bold"></i>
            </div>
            <div className="p-3 flex items-center justify-center border-x-2">
                <span>{quantity}</span>
            </div>
            <div onClick={increaseCountQuantity} className="p-3 flex items-center justify-center cursor-pointer">
                <i className="bx bx-plus text-[2rem] font-bold"></i>
            </div>
        </div>
    );
};

export default ProductOptionsQuantity;
