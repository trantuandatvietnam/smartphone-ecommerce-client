import { Input } from 'antd';
import React from 'react';

const FormConfig = ({ index, formData, productDescArray, setProductDescArray }) => {
    const handleClickRemoveField = () => {
        const newProductDescArray = [...productDescArray];
        newProductDescArray.splice(index, 1);
        setProductDescArray(newProductDescArray);
    };

    const handleChangeParamName = (e) => {
        const newProductDescArray = [...productDescArray];
        newProductDescArray[index].paramName = e.target.value;
        setProductDescArray(newProductDescArray);
    };

    const handleChangeValues = (e, valueIndex) => {
        const newProductDescArray = [...productDescArray];
        newProductDescArray[index].values[valueIndex] = e.target.value;
        setProductDescArray(newProductDescArray);
    };

    const handleAddValue = () => {
        const newProductDescArray = [...productDescArray];
        newProductDescArray[index].values = [...newProductDescArray[index].values, ''];
        setProductDescArray(newProductDescArray);
    };

    const handleRemoveValue = (indexValue) => {
        const newProductDescArray = [...productDescArray];
        newProductDescArray[index].values.splice(indexValue, 1);
        setProductDescArray(newProductDescArray);
    };
    return (
        <div>
            <div className="flex flex-col gap-y-8 mb-4">
                <div className="flex gap-x-8 items-center">
                    <Input
                        className="max-w-[20rem]"
                        placeholder={`Nhập tên thông số ${index + 1}`}
                        onChange={handleChangeParamName}
                        type="text"
                        value={formData.paramName}
                    />
                    <div
                        onClick={handleClickRemoveField}
                        className="flex items-center justify-center h-[2rem] w-[2rem] rounded-full bg-slate-100 hover:bg-slate-50 text-error text-[2rem] active:opacity-0 cursor-pointer"
                    >
                        <i className="bx bx-minus"></i>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-x-4 mb-8">
                <i
                    onClick={handleAddValue}
                    className="bx bx-plus-circle text-[2rem] active:opacity-0 cursor-pointer"
                ></i>
                {<span className="block text-success">Nhấn để thêm giá trị</span>}
            </div>
            <div className="pl-8 flex flex-col gap-y-8">
                {formData?.values?.map((inputValue, index) => (
                    <div key={index} className="flex gap-x-4 items-center">
                        <Input
                            className="max-w-[20rem]"
                            placeholder={`Nhập giá trị ${index + 1}`}
                            onChange={(e) => handleChangeValues(e, index)}
                            type="text"
                            value={inputValue}
                        />
                        <span onClick={() => handleRemoveValue(index)} className="text-error cursor-pointer">
                            Xóa
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormConfig;
