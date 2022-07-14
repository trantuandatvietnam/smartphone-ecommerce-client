import { Button } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import Title from '../../../components/title/Title';
import FormColor from './FormColor';
const EditAddColorForm = ({ productEdit, setProductEdit }) => {
    const [formColorArray, setFormColorArray] = useState([]);
    const [saved, setSaved] = useState(false);

    const handleClickAddFormColor = () => {
        setFormColorArray([...formColorArray, { color: '', image_url: '', public_id: '' }]);
    };

    const handleClickSaveFormColor = () => {
        setProductEdit({ ...productEdit, images: [...formColorArray] });
        setSaved(true);
    };

    useEffect(() => {
        if (productEdit?.images) {
            setFormColorArray(productEdit?.images);
        }
    }, [productEdit?.images]);

    return (
        <div className="mb-8">
            <div>
                <Title size="16">Màu sắc: </Title>
                <Button onClick={handleClickAddFormColor} type="primary" htmlType="submit">
                    Thêm +
                </Button>
            </div>
            <div className="flex flex-col gap-y-8 mb-8">
                {formColorArray.map((colorData, index) => (
                    <FormColor
                        colorData={colorData}
                        formColorArray={formColorArray}
                        setFormColorArray={setFormColorArray}
                        key={index}
                        index={index}
                    />
                ))}
            </div>
            {formColorArray.length !== 0 && (
                <div className="flex items-center gap-x-4">
                    <Button onClick={handleClickSaveFormColor} disabled={saved} type="primary" htmlType="submit">
                        {saved ? (
                            <div className="flex items-center">
                                <span>Đã lưu</span> <i className="bx bx-check text-[2rem] text-success "></i>
                            </div>
                        ) : (
                            'Lưu thông tin màu sắc'
                        )}
                    </Button>
                    {!saved && <span className="text-error">Thông tin thay đổi chưa được lưu!</span>}
                </div>
            )}
        </div>
    );
};

export default EditAddColorForm;
