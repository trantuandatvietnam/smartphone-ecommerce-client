import React, { useEffect, useRef } from 'react';

const InfoUserBase = ({ info, setInfo, showEdit }) => {
    // using ref
    const inputFullNameRef = useRef(null);

    const handleChangeInfoBase = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (showEdit) {
            inputFullNameRef.current.focus();
        }
    }, [showEdit]);
    return (
        <>
            <div className="flex flex-col gap-y-2 pl-4">
                <span>Tên hiển thị</span>
                {showEdit ? (
                    <input
                        type="text"
                        className="px-8 py-4 outline-none border-2"
                        value={info.fullName}
                        onChange={handleChangeInfoBase}
                        name="fullName"
                        ref={inputFullNameRef}
                    />
                ) : (
                    <span
                        type="text"
                        className="px-8 py-4 outline-none border-2"
                    >
                        {info.fullName}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-y-2 pl-4">
                <span>Số điện thoại</span>
                {showEdit ? (
                    <input
                        type="text"
                        className="px-8 py-4 outline-none border-2"
                        value={info.numberPhone}
                        onChange={handleChangeInfoBase}
                        name="numberPhone"
                    />
                ) : (
                    <span
                        type="text"
                        className="px-8 py-4 outline-none border-2"
                    >
                        {info.numberPhone}
                    </span>
                )}
            </div>
        </>
    );
};

export default InfoUserBase;
