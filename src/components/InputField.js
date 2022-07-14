import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';

const InputField = ({ label, control, name, placeholder, inputType }) => {
    const showBtnRef = useRef(null);
    const inputRef = useRef(null);

    const handleClickShowBtn = () => {
        if (showBtnRef.current.classList.contains('bx-hide')) {
            showBtnRef.current.classList.replace('bx-hide', 'bx-show-alt');
            inputRef.current.type = 'text';
        } else {
            showBtnRef.current.classList.replace('bx-show-alt', 'bx-hide');
            inputRef.current.type = 'password';
        }
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, name }, fieldState: { invalid, error } }) => (
                <div className="flex flex-col gap-2 mb-[2rem]">
                    <label className={`${invalid ? 'text-red-500' : ''}`} htmlFor={name}>
                        {label}
                    </label>
                    <div className="flex flex-col relative">
                        <input
                            className={`border ${
                                invalid ? 'border-red-500' : 'border-[#ccc]'
                            } px-8 py-4 outline-none rounded-md`}
                            name={name}
                            onChange={onChange}
                            value={value}
                            id={name}
                            placeholder={placeholder}
                            type={inputType}
                            ref={inputRef}
                        ></input>
                        <span
                            className={`${invalid ? 'text-red-500' : ''} text-[1.2rem] bottom-[-2rem] left-4 absolute`}
                        >
                            {invalid ? error.message : ''}
                        </span>
                        {inputType === 'password' && (
                            <i
                                ref={showBtnRef}
                                onClick={handleClickShowBtn}
                                className="bx bx-hide absolute top-[50%] translate-y-[-50%] right-4 text-[2rem] cursor-pointer"
                            ></i>
                        )}
                    </div>
                </div>
            )}
        />
    );
};

export default InputField;
