import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import productApis from '../../apis/productApis';
import Title from '../../components/title/Title';
import { setProductFilter } from '../../redux/slice/ProductFilterSlice';
import FilterBar from './components/FilterBar';
import ProductList from './components/ProductList';
import Sekelaton from './components/Sekelaton';
import SideBarLeft from './components/SideBarLeft';
import SubBanner from './components/SubBanner';

const Products = () => {
    // hook
    const { category, sort } = useParams();
    const navigate = useNavigate();
    const { search } = useLocation();
    const { brand, key } = queryString.parse(search);
    const dispatch = useDispatch();
    // date from store
    const productFilterData = useSelector((state) => state.productFilter);
    // state
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleChangePage = () => {
        dispatch(setProductFilter({ page: productFilterData.page + 1 }));
    };

    const handleClickShowCategory = () => {
        const categoryBtn = document.getElementById('category_button');
        categoryBtn.classList.toggle('translate-x-[-100%]');
    };
    useEffect(() => {
        (async function getProducts() {
            setLoading(true);
            const res = await productApis.getProducts(
                `?limit=${productFilterData.page * 9}&category=${category}${
                    brand ? `&brand=${brand.toLowerCase()}` : ''
                }&${sort}&productName[regex]=${key?.toLowerCase() || ''}`
            );
            setProductList(res.products);
            setLoading(false);
        })();
    }, [productFilterData, category, brand, key, sort]);

    return (
        <div className="py-4 wrapper pb-8 dark:bg-black">
            <div onClick={() => navigate('/')} className="inline-flex items-center cursor-pointer mb-4">
                <i className="bx bx-chevron-left text-[3rem]"></i>
                <span>Quay lại</span>
            </div>
            <div onClick={handleClickShowCategory} className="block cursor-pointer">
                <span className="font-bold">Danh mục</span>
            </div>
            <Title>
                <i className="bx bx-home-smile text-[2rem]"></i>
                <span className="whitespace-nowrap">Sản phẩm / {category}</span>
            </Title>
            <div className="flex gap-8">
                <SideBarLeft />
                <div className="flex-1 ">
                    <div className="mb-4">
                        <SubBanner />
                    </div>
                    <FilterBar />
                    {loading && (
                        <>
                            <span>Loading...</span>
                            <Sekelaton />
                        </>
                    )}
                    {key && (
                        <div className="mb-4">
                            Kết quả cho <span className="text-red-500 font-bold">"{key}"</span>
                        </div>
                    )}
                    <ProductList productList={productList} />
                    {productList > 9 && (
                        <div
                            className="py-8 dark:text-white text-[1.8rem] font-bold cursor-pointer flex justify-center items-center gap-x-4"
                            onClick={handleChangePage}
                        >
                            <span>Xem thêm</span>
                            <i className="bx bx-chevron-down"></i>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
