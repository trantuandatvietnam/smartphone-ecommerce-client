import { Button } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uploadApis from '../../../apis/uploadApis';
import { updateToast } from '../../../redux/slice/toastMessageSlice';

const AddCategoryForm = ({ newCategoryForm, setNewCategoryForm }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const [showInputAddBrand, setShowInputAddBrand] = useState(false);
    const [newBrand, setNewBrand] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddBrand = () => {
        setShowInputAddBrand(true);
    };

    const handleClickCancelAddBrandItem = () => {
        setNewBrand('');
        setShowInputAddBrand(false);
    };

    const handleChangeInputField = (e) => {
        setNewCategoryForm({
            ...newCategoryForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleClickAddBrandItem = () => {
        const newBrands = [...newCategoryForm.brand];
        newBrands.push(newBrand);
        setNewCategoryForm({ ...newCategoryForm, brand: newBrands });
        setNewBrand('');
    };

    const onChangeChooseFile = async (e) => {
        try {
            const file = e.target.files[0];
            if (file.size > 1024 * 1024) {
                //1024 * 1024 = 1mb
                return dispatch(
                    updateToast({
                        delay: 5000,
                        isShowToast: true,
                        type: 'error',
                        message: 'File quá lớn!',
                    })
                );
            }
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                return dispatch(
                    updateToast({
                        delay: 5000,
                        isShowToast: true,
                        type: 'error',
                        message: 'File không hợp lệ!',
                    })
                );
            }

            let formData = new FormData();
            formData.append('file', file);
            setLoading(true);
            const res = await uploadApis.uploadImage(token, formData);
            setLoading(false);
            setNewCategoryForm({ ...newCategoryForm, img: { public_id: res.public_id, url: res.url } });
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

    const handleDeleteImageBrand = async () => {
        try {
            setLoading(true);
            await uploadApis.destroy(token, newCategoryForm.img.public_id);
            setLoading(false);
            setNewCategoryForm({ ...newCategoryForm, img: { public_id: '', url: '' } });
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

    return (
        <div className="pl-8">
            <input
                onChange={handleChangeInputField}
                name="name"
                className="h-[4rem] outline-none mb-8 px-12 py-4 block border min-w-[40rem] "
                type="text"
                placeholder="Nhập tên danh mục"
            />
            <div className="flex items-center gap-x-4">
                <input
                    onChange={handleChangeInputField}
                    name="pathname"
                    className="h-[4rem] outline-none mb-8 px-12 py-4 block border min-w-[40rem] "
                    type="text"
                    placeholder="tên danh mục (english)"
                />
                <span className="text-error">Các từ cách nhau bằng dấu "_" VD: smart_watch</span>
            </div>
            <div className="flex items-center gap-x-4">
                <input
                    onChange={handleChangeInputField}
                    name="icon"
                    className="h-[4rem] outline-none mb-8 px-12 py-4 block border min-w-[40rem] "
                    type="text"
                    placeholder="class icon"
                />
                <a href="https://boxicons.com" className="text-blue-link">
                    Truy cập để lấy icon
                </a>
            </div>
            <div>
                <div className="flex items-center gap-x-4 mb-8">
                    <span>Thương hiệu</span>
                    <i
                        onClick={handleAddBrand}
                        className="bx bx-plus-circle text-[2rem] active:opacity-0 cursor-pointer"
                    ></i>
                </div>
                <div className="mb-8 pl-4">
                    {newCategoryForm.brand.map((item, index) => (
                        <div className="mb-4" key={index}>
                            <span className="font-semibold text-success">{item}</span>
                        </div>
                    ))}
                </div>
                {showInputAddBrand && (
                    <div className="mb-8 w-full max-w-[40rem] text-right">
                        <input
                            name="brand"
                            className="h-[4rem] w-full outline-none mb-8 px-12 py-4 block border "
                            type="text"
                            placeholder="tên thương hiệu"
                            onChange={(e) => setNewBrand(e.target.value)}
                            value={newBrand}
                        />
                        <div className="inline-flex items-center gap-x-8">
                            <Button onClick={handleClickCancelAddBrandItem} type="primary">
                                Bỏ
                            </Button>
                            <Button onClick={handleClickAddBrandItem} type="primary">
                                Thêm
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <div className="h-[16rem] flex items-center rounded-sm justify-center w-[16rem] border relative">
                {loading ? (
                    <span>Đang tải...</span>
                ) : newCategoryForm.img.url ? (
                    <div className="relative w-full h-full">
                        <span
                            onClick={handleDeleteImageBrand}
                            className="absolute cursor-pointer top-[1rem] right-[1rem] flex items-center w-[2rem] h-[2rem] rounded-full justify-center"
                        >
                            X
                        </span>
                        <img className="h-full w-full object-contain" src={newCategoryForm.img.url} alt="" />
                    </div>
                ) : (
                    <>
                        <i className="bx bx-cloud-upload text-[4rem]"></i>
                        <input
                            onChange={onChangeChooseFile}
                            type="file"
                            className=" absolute top-0 w-full h-full opacity-0"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AddCategoryForm;
