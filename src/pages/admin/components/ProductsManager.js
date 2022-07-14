import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../components/loading/Loading';
import { Link } from 'react-router-dom';
import productApis from '../../../apis/productApis';
import uploadApis from '../../../apis/uploadApis';
import ConfirmModal from './ConfirmModal';
import ProductCardManager from './ProductCardManager';

const ProductsManager = () => {
    // Data from store
    const products = useSelector((state) => state.product.products);
    const token = useSelector((state) => state.auth.token);
    // State
    const [productsChecked, setProductsChecked] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangeCheckedAll = () => {
        if (productsChecked.length === products.length) {
            setProductsChecked([]);
        } else {
            setProductsChecked(products);
        }
    };

    const onRemoveAllProductsSlected = () => {
        setShowConfirmModal(true);
    };

    const handleRemoveAllProductsSlected = async () => {
        // handle delete selected products
        try {
            const promisesProductDelete = [];
            const promisesColorsDelete = [];
            const promisesProductThumbnailDelete = [];

            productsChecked.forEach((product) => {
                const newProductDeletePromise = productApis.deleteProduct(token, product._id);
                const newPromisesProductThumbnailDelete = uploadApis.destroy(token, product.thumbnail.public_id);
                promisesProductThumbnailDelete.push(newPromisesProductThumbnailDelete);
                promisesProductDelete.push(newProductDeletePromise);

                product.images.forEach((color) => {
                    const newPromisesProductColorDelete = uploadApis.destroy(token, color.public_id);
                    promisesColorsDelete.push(newPromisesProductColorDelete);
                });
            });
            setLoading(true);
            await Promise.all(promisesProductDelete);
            await Promise.all(promisesColorsDelete);
            await Promise.all(promisesProductThumbnailDelete);
            setLoading(false);
            // close confirm
            setShowConfirmModal(false);
            window.location.reload();
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    return (
        <div>
            {loading && <Loading />}
            <ConfirmModal
                handleRemoveAllProductsSlected={handleRemoveAllProductsSlected}
                showConfirmModal={showConfirmModal}
                setShowConfirmModal={setShowConfirmModal}
            />
            <Link
                to="/admin/manager/product/create"
                className="btn dark:bg-white inline-flex items-center gap-x-4 mb-8"
            >
                <i className="bx bx-plus dark:text-black"></i>
                <span className="text-black dark:text-black">Thêm sản phẩm</span>
            </Link>
            <div className="flex flex-col gap-y-8">
                <div className="flex items-center gap-x-8">
                    {products.length !== 0 && (
                        <label className="dark:text-white cursor-pointer flex items-center gap-x-4">
                            <input
                                checked={productsChecked.length === products.length}
                                onChange={handleChangeCheckedAll}
                                type="checkbox"
                            />
                            Chọn tất cả
                        </label>
                    )}
                    {productsChecked.length !== 0 && (
                        <div>
                            <span
                                onClick={onRemoveAllProductsSlected}
                                className="text-error cursor-pointer active:opacity-0"
                            >
                                Xóa
                            </span>
                        </div>
                    )}
                </div>
                {products.length !== 0 ? (
                    <div className={`grid lg:grid-cols-5 md:grid-cols-4 gap-[2rem]`}>
                        {products.map((product) => (
                            <ProductCardManager
                                productsChecked={productsChecked}
                                setProductsChecked={setProductsChecked}
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div>
                        <span className="font-bold text-[1.6rem]">Bạn chưa thêm sản phẩm nào!</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsManager;
