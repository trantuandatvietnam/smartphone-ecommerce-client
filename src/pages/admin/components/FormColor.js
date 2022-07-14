import { Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uploadApis from '../../../apis/uploadApis';
import { updateToast } from '../../../redux/slice/toastMessageSlice';

const FormColor = ({ index, colorData, formColorArray, setFormColorArray }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false);
    const handleClickRemoveFormColor = () => {
        const newFormColorArray = [...formColorArray];
        newFormColorArray.splice(index, 1);
        handleDeleteImage();
        setFormColorArray(newFormColorArray);
    };

    const handleChangeColorName = (e) => {
        const newFormColorArray = [...formColorArray];
        newFormColorArray[index].color = e.target.value;
        setFormColorArray(newFormColorArray);
    };

    const handleChooseFile = async (e) => {
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
            setLoading(true);
            const res = await uploadApis.uploadImage(token, formData);
            const newFormColorArray = [...formColorArray];
            newFormColorArray[index] = { color: colorData.color, image_url: res.url, public_id: res.public_id };
            setFormColorArray(newFormColorArray);
            setLoading(false);
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

    const handleDeleteImage = async () => {
        if (colorData.public_id) {
            try {
                setLoading(true);
                await uploadApis.destroy(token, colorData.public_id);
                const newFormColorArray = [...formColorArray];
                newFormColorArray[index] = { color: '', image_url: '', public_id: '' };
                setFormColorArray(newFormColorArray);
                setLoading(false);
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
    };

    return (
        <div className="flex gap-x-8 items-center">
            <div className="flex gap-x-4">
                <label className="whitespace-nowrap">Màu sắc {index + 1}: </label>
                <Input value={colorData.color} onChange={handleChangeColorName} type="text" />
            </div>
            <div className="flex items-center justify-center gap-x-4 p-4">
                <div className="relative h-[10rem] w-[10rem] flex items-center justify-center border">
                    {loading ? (
                        <span className="text-center">Đang thực hiện yêu cầu ...</span>
                    ) : colorData.image_url ? (
                        <div className="relative h-full w-full flex justify-center p-4">
                            <img className="h-full w-full object-contain" src={colorData.image_url} alt="" />
                            <span
                                onClick={handleDeleteImage}
                                className="absolute top-[0.5rem] right-[0.5rem]  flex items-center justify-center h-[1.6rem] w-[1.6rem] bg-error text-white rounded-full active:opacity-0 cursor-pointer"
                            >
                                <i className="bx bx-minus"></i>
                            </span>
                        </div>
                    ) : (
                        <>
                            <input
                                onChange={handleChooseFile}
                                className=" cursor-pointer z-10 opacity-0 absolute h-full w-full"
                                type="file"
                            />
                            <div className="w-full h-full flex flex-col items-center justify-center">
                                <i className="bx text-[2rem] bx-upload"></i>
                                <span className="block">Upload</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div onClick={handleClickRemoveFormColor}>
                <span className="font-bold text-error cursor-pointer">Xóa</span>
            </div>
        </div>
    );
};

export default FormColor;
