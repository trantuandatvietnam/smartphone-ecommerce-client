import React, { memo, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productApis from '../../apis/productApis';
import Loading from '../../components/loading/Loading';
import averaged from '../../ultis/averagedAray';
import checkActive from '../../ultis/checkActive';
import discountPrice from '../../ultis/discountPrice';
import formatPrice from '../../ultis/formatPrice';
import PageNotFound from '../pageNotFound/pageNotFound';
import MessageTag from '../products/components/MessageTag/MessageTag';
import ProductDetailsInfo from './components/ProductDetailsInfo';
import ProductDetailsOption from './components/ProductDetailsOption';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    // console.log(product);
    useLayoutEffect(() => {
        (async function getProductById() {
            try {
                setLoading(true);
                const res = await productApis.getProductById(id);
                setProduct(res.product);
                setCurrentImage(res.product.images[0].image_url);
                setLoading(false);
            } catch (error) {
                console.log(error.response.data.message);
                setLoading(false);
            }
        })();
    }, [id]);

    // if it is loading then show loading
    if (loading) {
        return <Loading />;
    }

    if (!product) return <PageNotFound />;

    return (
        <div className="wrapper mt-[4rem] bg-slate-100 px-[4rem] py-[2rem]">
            <div className="flex flex-col md:flex-row gap-[4rem] mb-[4rem]">
                <div className="basis-1/3">
                    <div className="relative bg-white rounded-lg mb-4 p-8 flex items-center justify-center">
                        <img
                            className="hover:scale-110 scale-90 cursor-zoom-in transition-transform"
                            src={currentImage}
                            alt=""
                        />
                        {product.quantity === 0 && (
                            <div className="absolute top-0 right-0">
                                <MessageTag>Hết hàng</MessageTag>
                            </div>
                        )}
                    </div>
                    <div className="flex mb-8 gap-x-4 items-center justify-center">
                        {product.images.map((img, index) => (
                            <div
                                onClick={() => setCurrentImage(img.image_url)}
                                className={`max-w-[5rem]  cursor-pointer border-2 shadow-xl flex flex-col gap-y-2 ${
                                    checkActive(currentImage, img.image_url) ? 'border-red-500' : ''
                                }`}
                                key={index}
                            >
                                <img src={img.image_url} alt="" />
                                <span className="truncate text-[1.2rem] w-full text-center font-semibold">
                                    {img.color}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-y-4">
                    <div className="flex gap-4">
                        <h3 className="capitalize text-[2.4rem] font-semibold">{product?.productName}</h3>
                    </div>
                    <div>
                        {product?.sale !== 0 ? (
                            <>
                                <div className="mb-4">
                                    Giá gốc: <span className="line-through">{formatPrice(product?.price)}</span>
                                </div>
                                <div>
                                    Giá khuyến mãi:{' '}
                                    <span className="text-red-500 font-bold">
                                        {formatPrice(discountPrice(product?.price, product?.sale))}
                                    </span>{' '}
                                    (giảm {product?.sale}%)
                                </div>
                            </>
                        ) : (
                            <div>
                                Giá: <span className="text-red-500 font-bold">{formatPrice(product?.price)}</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <span>Số lượng hàng đã bán: {product?.sold}</span>
                    </div>
                    <ProductDetailsOption product={product} />
                </div>
            </div>
            <ProductDetailsInfo product={product} />
        </div>
    );
};

export default memo(ProductDetails);
