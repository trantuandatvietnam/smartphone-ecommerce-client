import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddressUserInfo from './AddressUserInfo';
import InfoUserBase from './BaseUserInfo';
import InfoUserHeader from './InfoUserHeader';

const InfoUser = () => {
    // data from store
    const userData = useSelector((state) => state.auth.infoUser);
    // state
    const [info, setInfo] = useState({
        fullName: '',
        numberPhone: '',
        address: '',
    });

    const [showEdit, setShowEdit] = useState(false);
    const [isShowFormAddAddress, setIsShowFormAddAddress] = useState(false);

    useEffect(() => {
        setInfo({
            fullName: userData.name || userData.email.split('@')[0],
            numberPhone: userData.number_phone,
            address: userData.address,
        });
    }, [userData]);

    return (
        <div className="max-w-[80rem] bg-white mx-auto mt-[8rem] p-12 mb-[8rem]">
            <div className="flex flex-col gap-y-8">
                <InfoUserHeader
                    info={info}
                    setInfo={setInfo}
                    setShowEdit={setShowEdit}
                    setIsShowFormAddAddress={setIsShowFormAddAddress}
                    showEdit={showEdit}
                />
                <InfoUserBase
                    info={info}
                    setInfo={setInfo}
                    showEdit={showEdit}
                />
                <AddressUserInfo
                    setInfo={setInfo}
                    info={info}
                    showEdit={showEdit}
                    isShowFormAddAddress={isShowFormAddAddress}
                    setIsShowFormAddAddress={setIsShowFormAddAddress}
                    setShowEdit={setShowEdit}
                />
            </div>
        </div>
    );
};

export default InfoUser;
