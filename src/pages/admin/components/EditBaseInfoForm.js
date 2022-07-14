import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uploadApis from '../../../apis/uploadApis';
import { updateToast } from '../../../redux/slice/toastMessageSlice';
import { Button, Form, Input, Select } from 'antd';
import Title from '../../../components/title/Title';
const { Option } = Select;

const EditBaseInfoForm = ({ productEdit, setProductEdit }) => {
    // using hooks
    const dispatch = useDispatch();
    // using form from antd
    const [form] = Form.useForm();

    // data from store
    const categories = useSelector((state) => state.category.categories);
    const token = useSelector((state) => state.auth.token);

    // state date
    const [saved, setSaved] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbLoading, setThumbLoading] = useState(false);
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState('');
    const [categorySelected, setCategorySelected] = useState('');

    // submit form fail
    const onFinishFailed = () => {
        dispatch(
            updateToast({
                delay: 5000,
                isShowToast: true,
                type: 'error',
                message: 'Có lỗi xảy ra, vui lòng xem lại',
            })
        );
    };
    // submit success
    const onFinish = (values) => {
        setProductEdit({
            ...productEdit,
            ...values,
            sale: Number(values.sale),
            brand,
            thumbnail,
            category: categorySelected,
        });
        setSaved(true);
    };
    const handleChangeCategory = (selectedName) => {
        form.setFieldsValue({ brand: '' });
        setCategorySelected(selectedName);
    };

    const handleChangeBrand = (brand) => {
        setBrand(brand);
    };

    const handleUploadFile = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file) {
                return dispatch(
                    updateToast({
                        delay: 5000,
                        isShowToast: true,
                        type: 'error',
                        message: 'File không tồn tại',
                    })
                );
            }
            if (file.size > 1024 * 1024) {
                return dispatch(
                    updateToast({
                        delay: 5000,
                        isShowToast: true,
                        type: 'error',
                        message: 'Kích thước file quá lớn',
                    })
                );
            }
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                return dispatch(
                    updateToast({
                        delay: 5000,
                        isShowToast: true,
                        type: 'error',
                        message: 'Định dạng file không hợp lệ',
                    })
                );
            }
            let formData = new FormData();
            formData.append('file', file);
            setThumbLoading(true);
            const res = await uploadApis.uploadImage(token, formData);
            setThumbnail(res);
            setThumbLoading(false);
        } catch (error) {
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: error.response.data.message,
                })
            );
        }
    };

    const handleDeleteThumnail = async () => {
        if (thumbnail.public_id !== productEdit.thumbnail.public_id) {
            try {
                setThumbLoading(true);
                await uploadApis.destroy(token, thumbnail.public_id);
                setThumbLoading(false);
            } catch (error) {
                dispatch(
                    updateToast({
                        delay: 5000,
                        isShowToast: true,
                        type: 'error',
                        message: error.response.data.message,
                    })
                );
            }
        }
        setThumbnail(null);
    };

    useEffect(() => {
        const brands = categories.find((category) => category.pathname === productEdit?.category)?.brand;
        setBrands(brands);
    }, [productEdit?.category, categories, form]);

    useEffect(() => {
        setThumbnail(productEdit?.thumbnail);
    }, [productEdit?.thumbnail]);

    useEffect(() => {
        setBrand(productEdit?.brand);
    }, [productEdit?.brand]);

    useEffect(() => {
        setCategorySelected(productEdit?.category);
    }, [productEdit?.category]);
    if (!productEdit) return;
    return (
        <>
            <Title size="16">Thông tin cơ bản</Title>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                onFinish={onFinish}
                initialValues={{ ...productEdit }}
            >
                <Form.Item
                    label="Tên sản phẩm"
                    name="productName"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên sản phẩm',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá sản phẩm (VNĐ)"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá của sản phẩm',
                        },
                        {
                            pattern: new RegExp(/^[0-9]+$/),
                            message: 'Giá của sản phẩm phải là một số',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Khuyến mãi (%)"
                    name="sale"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số lượng của sản phẩm',
                        },
                        {
                            pattern: new RegExp(/^[0-9]+$/),
                            message: 'Sale của sản phẩm phải là một số',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số lượng sản phẩm"
                    name="quantity"
                    rules={[
                        {
                            pattern: new RegExp(/^[0-9]+$/),
                            message: 'Số lượng của sản phẩm phải là một số',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Danh Mục"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa chọn danh mục',
                        },
                    ]}
                >
                    <Select style={{ width: 200 }} onChange={handleChangeCategory}>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <Option key={category._id} value={category.pathname}>
                                    {category.name}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>

                {brands && (
                    <Form.Item
                        name="brand"
                        label="Thương hiệu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn thương hiệu',
                            },
                        ]}
                    >
                        <Select value="selected" style={{ width: 200 }} onChange={handleChangeBrand}>
                            {brands.map((brand) => (
                                <Option key={brand} value={brand}>
                                    {brand}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
                <Form.Item label="Chọn ảnh thumbnail">
                    <div className="p-8 h-[20rem] flex items-center justify-center cursor-pointer flex-col w-[20rem] relative border">
                        {thumbLoading ? (
                            <span className="font-normal text-[1.8rem]">Đang tải...</span>
                        ) : thumbnail?.url ? (
                            <div className="relative w-full h-full">
                                <img className="h-full w-full object-contain" src={thumbnail?.url} alt="" />
                                <span
                                    onClick={handleDeleteThumnail}
                                    className="flex bg-slate-100 items-center justify-center cursor-pointer h-[2rem] w-[2rem] rounded-full active:opacity-0 absolute top-[-1.6rem] right-[-1.6rem]"
                                >
                                    X
                                </span>
                            </div>
                        ) : (
                            <>
                                <i className="bx bx-upload text-[5rem]" />
                                <span className="block text-[2rem] font-bold text-center">Thêm ảnh thumnail</span>
                                <input
                                    className="absolute opacity-0 bg-red-500 block z-50 h-full w-full top-0"
                                    onChange={handleUploadFile}
                                    type="file"
                                    name="file"
                                />
                            </>
                        )}
                    </div>
                </Form.Item>
                <Form.Item>
                    <div className="flex items-center gap-x-4">
                        <Button disabled={saved} type="primary" htmlType="submit">
                            {saved ? (
                                <div className="flex items-center">
                                    <span>Đã lưu</span> <i className="bx bx-check text-[2rem] text-success "></i>
                                </div>
                            ) : (
                                'Lưu thông tin cơ bản'
                            )}
                        </Button>
                        {!saved && <span className="text-error">Thông tin thay đổi chưa được lưu!</span>}
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};

export default EditBaseInfoForm;
