import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authApis from '../../apis/authApis';
import { updateInfoUser } from '../../redux/slice/authSlice';
import { updateToast } from '../../redux/slice/toastMessageSlice';

const InfoUserHeader = ({ showEdit, setShowEdit, setInfo, setIsShowFormAddAddress, info }) => {
    // data from store
    const userData = useSelector((state) => state.auth);
    const { infoUser, token } = userData;
    // hook
    const dispatch = useDispatch();

    // state
    const [loading, setLoading] = useState(false);

    // function
    const handleClickSaveInfo = async () => {
        try {
            const infoUpdate = {
                name: info.fullName,
                address: info.address,
                number_phone: info.numberPhone,
            };

            // if infoUpdate matches current users info then show toast warning
            if (
                JSON.stringify(infoUpdate.address) === JSON.stringify(infoUser.address) &&
                infoUpdate.number_phone === infoUser.number_phone &&
                infoUpdate.name === infoUser.name &&
                infoUpdate.descriptionAddress === infoUser.descriptionAddress
            ) {
                dispatch(
                    updateToast({
                        delay: 5000,
                        isShowToast: true,
                        type: 'warning',
                        message: 'Bạn chưa thay đổi thông tin nào!',
                    })
                );
                return;
            }

            // validate number phone
            const validateNumberphone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            if (!validateNumberphone.test(infoUpdate?.number_phone)) {
                dispatch(
                    updateToast({
                        delay: 5000,
                        isShowToast: true,
                        type: 'error',
                        message: 'Cập nhật thất bại do số điện thoại của bạn không hợp lệ!',
                    })
                );
                return;
            }
            // validate name
            if (infoUpdate?.name.length < 2 || infoUpdate?.name.length > 16) {
                dispatch(
                    updateToast({
                        delay: 5000,
                        isShowToast: true,
                        type: 'error',
                        message: 'Tên của bạn cần tối thiếu 2 kí tự và tối đa 16 kí tự',
                    })
                );
                return;
            }

            dispatch(updateInfoUser(infoUpdate));
            await authApis.updateUserInfo(token, { fieldsUpdate: infoUpdate });
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'success',
                    message: 'Cập nhật thông tin thành công!',
                })
            );
            setShowEdit(false);
            setIsShowFormAddAddress(false);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    const onClickEditInfo = () => {
        setShowEdit(!showEdit);
    };

    const handleClickBack = () => {
        setInfo({
            fullName: infoUser.name || infoUser.email.split('@')[0],
            numberPhone: infoUser.number_phone,
            address: infoUser.address,
        });
        setShowEdit(false);
        setIsShowFormAddAddress(false);
    };
    return (
        <div className="w-full flex justify-between items-center">
            <h3 className={`font-medium text-[2rem] mb-4 ${showEdit ? 'translate-y-[-120%] hidden' : 'translate-y-0'}`}>
                Thông tin của bạn
            </h3>
            <h3
                className={`font-medium text-[2rem] mb-4 transition-transform ${
                    showEdit ? 'translate-y-0' : 'translate-y-[-120%] invisible'
                }`}
            >
                Chỉnh sửa thông tin
            </h3>
            <div className="cursor-pointer">
                {showEdit ? (
                    <div className="flex items-center gap-x-4">
                        <span onClick={handleClickBack} className="text-success active:opacity-0">
                            Quay lại
                        </span>
                        <span className="font-thin">|</span>
                        <span onClick={handleClickSaveInfo} className="text-success active:opacity-0">
                            Lưu thay đổi
                        </span>
                    </div>
                ) : (
                    <div onClick={onClickEditInfo} className="flex items-center gap-x-2">
                        <span>Sửa</span>
                        <i className="bx bx-edit text-[2.4rem] active:opacity-0"></i>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoUserHeader;
