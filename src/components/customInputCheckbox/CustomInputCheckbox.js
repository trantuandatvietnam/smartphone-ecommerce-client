import React from 'react';

const CustomInputCheckbox = ({ label = '', checked, onChange }) => {
    return (
        <label className="flex items-center gap-x-4 cursor-pointer">
            <div className=" relative w-[1.6rem] h-[1.6rem] border-2 flex items-center justify-center">
                <input
                    checked={checked}
                    onChange={onChange}
                    type="checkbox"
                    className="absolute top-0 w-full h-full invisible"
                />
                <i
                    className={`bx bx-check text-success transition-transform ${checked ? ' scale-100' : 'scale-0'}`}
                ></i>
            </div>
            {label}
        </label>
    );
};

export default CustomInputCheckbox;
