import React from 'react';
import LocationForm from '../../components/locationForm/LocationForm';
import { Address } from '../../constructor/Address';

const AddressUserInfo = ({ showEdit, info, setInfo, setIsShowFormAddAddress, isShowFormAddAddress, setShowEdit }) => {
    const handleDeleteAddress = (addressIndexDelete) => {
        const newAddresses = [...info.address];
        newAddresses.splice(addressIndexDelete, 1);
        setInfo({ ...info, address: newAddresses });
    };

    const handleAddAddress = () => {
        setIsShowFormAddAddress(!isShowFormAddAddress);
        if (!showEdit) {
            setShowEdit(true);
        }
    };

    return (
        <div className="flex flex-col gap-y-4 pl-4">
            <div>
                <span>Địa chỉ</span>
            </div>
            <div className="pl-4">
                {info.address.length === 0 ? (
                    <div className="mb-8 flex items-center gap-x-4">
                        <i className="bx bx-comment-error text-warning text-[2.4rem]"></i>
                        <span className="text-warning">
                            Bạn chưa thiết lập địa chỉ, hãy cập nhật thông tin của bạn trước khi mua hàng!
                        </span>
                    </div>
                ) : (
                    <div>
                        {info.address.map((ad, index) => (
                            <div key={index} className="flex mb-4 gap-y-2 flex-col">
                                <span>Địa chỉ {index + 1}: </span>
                                <div className="border p-4 relative flex items-center pr-[6rem]">
                                    <span className="border-r-2 pr-4 text-justify">
                                        {new Address(ad.descriptionAddress, ad.ward, ad.district, ad.city).getAddress()}
                                    </span>
                                    {showEdit && (
                                        <span
                                            onClick={() => handleDeleteAddress(index)}
                                            className="absolute cursor-pointer active:opacity-0 text-red-500 right-[2rem] top-[50%] translate-y-[-50%]"
                                        >
                                            Xóa
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {(showEdit || info.address.length === 0) && (
                    <div onClick={handleAddAddress} className="inline-flex items-center gap-x-2 btn ">
                        <div>
                            <span>Thêm địa chỉ</span>
                        </div>
                        <i className="bx bx-plus"></i>
                    </div>
                )}
            </div>
            {isShowFormAddAddress && (
                <LocationForm setInfo={setInfo} info={info} setIsShowFormAddAddress={setIsShowFormAddAddress} />
            )}
        </div>
    );
};

export default AddressUserInfo;
