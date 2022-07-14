import React from 'react';
import { useNavigate } from 'react-router-dom';
import averaged from '../../../ultis/averagedAray';
import discountPrice from '../../../ultis/discountPrice';
import formatPrice from '../../../ultis/formatPrice';

const ProductCard = ({ product }) => {
    // using hook
    const navigate = useNavigate();
    // function
    const handleClickDetails = (e, product) => {
        e.stopPropagation();
        navigate(`/products/details/${product._id}`);
    };

    return (
        <div className="group bg-white flex flex-col relative hover:border-blue-primary p-6 border-[2px] rounded-[3px] shadow-xl">
            <div className="flex justify-center items-center mb-4">
                <div className="bg-white overflow-hidden w-[17.3rem] h-[17.3rem]">
                    <img
                        onError={(e) =>
                            (e.target.src =
                                'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png')
                        }
                        src={product.thumbnail?.url}
                        className="transition-transform group-hover:scale-100 scale-90"
                        alt=""
                    />
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <div className="two-row font-semibold capitalize min-h-[5rem]">{product.productName}</div>
                <div
                    className={`text-[1.4rem] ${
                        product.sale !== 0 ? 'line-through text-gray-500 font-normal' : 'text-red-500 font-semibold'
                    }`}
                >
                    {formatPrice(product.price)}
                </div>
                {product.sale !== 0 && (
                    <div className="text-red-500 font-semibold text-[1.4rem]">
                        {formatPrice(discountPrice(product.price, product.sale))}
                    </div>
                )}
                <div className="flex items-center justify-between mb-4">
                    {/* {product?.rate?.length !== 0 && (
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-[1.4rem] text-red-500">{averaged(product.rate)}</span>
                            <i className="bx bxs-star text-yellow-500"></i>
                        </div>
                    )} */}
                    <div>
                        <span className="text-[1.2rem] text-gray-500">Lượt mua: {product.sold}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-auto">
                    <div
                        onClick={(e) => handleClickDetails(e, product)}
                        className="text-green-500 font-semibold text-[1.4rem] cursor-pointer"
                    >
                        Chi tiết
                    </div>
                </div>
            </div>
            {product.sale !== 0 && (
                <div className="discount_flag rounded-l-lg absolute top-0 right-[-10px] px-8 py-4 bg-red-500 text-white">
                    {product.sale}% giảm
                </div>
            )}
        </div>
    );
};

export default ProductCard;
