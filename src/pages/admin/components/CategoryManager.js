import { Button } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import categoryApis from '../../../apis/categoryApis';
import Title from '../../../components/title/Title';
import { updateToast } from '../../../redux/slice/toastMessageSlice';
import AddCategoryForm from './AddCategoryForm';

const CategoryManager = () => {
    const token = useSelector((state) => state.auth.token);
    const categories = useSelector((state) => state.category.categories);
    const products = useSelector((state) => state.product.products);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [isAddCate, setShowIsAddCate] = useState(false);
    const [newCategoryForm, setNewCategoryForm] = useState({
        name: '',
        pathname: '',
        icon: '',
        img: {
            public_id: '',
            url: '',
        },
        brand: [],
    });

    const checkExistBrand = (brandName, cate) => {
        return products.find((product) => product.brand === brandName && product.category === cate.pathname);
    };

    const handleDeleteCate = async (category) => {
        try {
            const newCategoryList = [...categoryList];
            const index = newCategoryList.findIndex((item) => item._id === category._id);
            await categoryApis.deleteCategory(token, category._id, { category: category.pathname });
            newCategoryList.splice(index, 1);
            setCategoryList(newCategoryList);
        } catch (error) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: error?.response?.data?.message,
                })
            );
        }
    };

    const handleRemoveDeleteBrand = async (brandName, cate) => {
        if (checkExistBrand(brandName, cate)) {
            return dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: 'Vui lòng xóa hết các sản phẩm được tạo bởi thương hiệu này!',
                })
            );
        }
        const indexCate = categoryList.findIndex((item) => item._id === cate._id);
        const indexBrand = categoryList[indexCate].brand.findIndex((item) => item === brandName);
        const newBrands = [...categoryList[indexCate].brand];
        newBrands.splice(indexBrand, 1);
        const newCategoryList = [...categoryList];
        newCategoryList[indexCate] = { ...newCategoryList[indexCate], brand: newBrands };
        setCategoryList(newCategoryList);
        await categoryApis.updateCategory(token, cate._id, { brand: newBrands });
    };

    const handleShowCategory = () => {
        setShowIsAddCate(true);
    };

    const handleSaveCategory = async () => {
        try {
            const result = categories.find(
                (cate) => cate.name === newCategoryForm.name || cate.pathname === newCategoryForm.pathname
            );
            if (Boolean(result)) {
                return updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: 'Đã tồn tại!',
                });
            }
            if (!newCategoryForm.name || !newCategoryForm.pathname || !newCategoryForm.icon || !newCategoryForm.img) {
                return dispatch(
                    updateToast({
                        delay: 5000,
                        isShowToast: true,
                        type: 'error',
                        message: 'Vui lòng nhập tất cả các trường!',
                    })
                );
            }
            setLoading(true);
            await categoryApis.createCategory(token, newCategoryForm);
            setLoading(false);
            setShowIsAddCate(false);
            setNewCategoryForm({
                name: '',
                pathname: '',
                icon: '',
                img: {
                    public_id: '',
                    url: '',
                },
                brand: [],
            });
            window.location.reload();
        } catch (error) {
            return dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: error.response.data.message,
                })
            );
        }
    };

    useEffect(() => {
        if (categories && categories.length > 0) {
            setCategoryList(categories);
        }
    }, [categories]);
    return (
        <div>
            <div className="mb-12">
                <Title>Danh mục của bạn</Title>
                <div className="flex items-center gap-x-4">
                    <Button onClick={handleShowCategory} type="primary">
                        Thêm +
                    </Button>
                    {isAddCate && (
                        <Button onClick={handleSaveCategory} type="primary">
                            {loading ? <span>Đang tạo...</span> : 'Lưu'}
                        </Button>
                    )}
                </div>
            </div>
            {isAddCate && (
                <div className="mb-12">
                    <AddCategoryForm newCategoryForm={newCategoryForm} setNewCategoryForm={setNewCategoryForm} />
                </div>
            )}
            <ul className="pl-12">
                {categoryList.map((cate) => (
                    <li key={cate._id}>
                        <div>
                            <div className="flex items-center gap-x-8 mb-4">
                                <span className="text-[2rem] font-semibold text-success">
                                    {cate.name.charAt(0).toUpperCase() + cate.name.slice(1)}
                                </span>

                                <i
                                    className="bx bx-minus-circle cursor-pointer active:opacity-0 text-error
                                    text-[2rem]"
                                    onClick={() => handleDeleteCate(cate)}
                                ></i>
                            </div>
                            <div className="pl-4 mb-8">
                                <span className="font-bold block mb-4">Thương hiệu: </span>
                                {cate.brand.length !== 0 ? (
                                    cate.brand.map((brand) => (
                                        <div className="mb-4 flex items-center gap-x-8" key={brand}>
                                            <span>{brand}</span>
                                            <i
                                                onClick={() => handleRemoveDeleteBrand(brand, cate)}
                                                className="bx bx-minus-circle cursor-pointer active:opacity-0 text-error text-[2rem]"
                                            ></i>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-error">Chưa có thương hiệu nào được thêm</span>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryManager;
