import { Button } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import Title from '../../../components/title/Title';
import FormConfig from './FormConfig';

const EditCreateDescProductForm = ({ productEdit, setProductEdit }) => {
    const [productDescArray, setProductDescArray] = useState([]);
    const [saved, setSaved] = useState(false);

    const handleClickAddDesc = () => {
        setProductDescArray([...productDescArray, { paramName: '', values: [] }]);
    };

    const handleSaveConfigInfo = () => {
        const data = {};
        productDescArray.forEach((productDesc) => {
            data[productDesc.paramName] = productDesc.values;
        });
        setProductEdit({ ...productEdit, productDescription: { ...data } });
        setSaved(true);
    };

    useEffect(() => {
        if (productEdit?.productDescription) {
            const newProductDesc = Object.keys(productEdit.productDescription).reduce((initial, curr) => {
                const newItem = { paramName: [curr], values: [...productEdit.productDescription[curr]] };
                return (initial = [...initial, newItem]);
            }, []);
            setProductDescArray(newProductDesc);
        }
    }, [productEdit?.productDescription]);

    return (
        <>
            <div className="mb-8">
                <Title size="16">Thông tin cấu hình: </Title>
                <Button onClick={handleClickAddDesc} type="primary" htmlType="submit">
                    Thêm +
                </Button>
            </div>
            <div className="flex flex-col gap-y-8 mb-8">
                {productDescArray &&
                    productDescArray?.map((formData, index) => (
                        <FormConfig
                            formData={formData}
                            productDescArray={productDescArray}
                            setProductDescArray={setProductDescArray}
                            index={index}
                            key={index}
                        />
                    ))}
            </div>
            {productDescArray.length !== 0 && (
                <Button disabled={saved} onClick={handleSaveConfigInfo} type="primary">
                    {saved ? (
                        <div className="flex items-center">
                            <span>Đã lưu</span> <i className="bx bx-check text-[2rem] text-success "></i>
                        </div>
                    ) : (
                        'Lưu thông tin cấu hình'
                    )}
                </Button>
            )}
        </>
    );
};

export default EditCreateDescProductForm;
