import React from 'react';
import checkActive from '../../../ultis/checkActive';

const ProductColorsOptions = ({ product, setUserColor, userColor }) => {
    return (
        <div>
            <div className="mb-4">
                <span className="text-red-500 text-[1.4rem] font-bold">Màu sắc:</span>{' '}
            </div>
            <div className="flex gap-4 flex-wrap max-w-[20rem] mb-4">
                {product?.images.map((img, index) => (
                    <div
                        onClick={() => setUserColor(img.color)}
                        key={index}
                        className={`${
                            checkActive(userColor, img.color) ? 'border-red-500' : ''
                        } px-2 border-2  text-center py-1 basis-[calc(50%-1rem)] rounded-lg cursor-pointer`}
                    >
                        <span className="text-[1.2rem] font-semibold">{img.color}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductColorsOptions;
