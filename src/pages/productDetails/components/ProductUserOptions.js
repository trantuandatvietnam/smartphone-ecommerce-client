import React from 'react';
import checkActive from '../../../ultis/checkActive';

const ProductUserOptions = ({ options, product, userOptions, setUserOptions }) => {
    return (
        <div>
            {options.map((option, index) => (
                <div key={index}>
                    <div className="mb-4">
                        <span className="text-red-500 text-[1.4rem] font-bold">{option}: </span>
                    </div>
                    <div className="flex gap-4 flex-wrap max-w-[20rem] mb-4">
                        {product.productDescription[option].map((item, index) => (
                            <div
                                onClick={() => setUserOptions({ ...userOptions, [option]: item })}
                                key={index}
                                className={`${
                                    userOptions && checkActive(userOptions[option], item) ? 'border-red-500' : ''
                                } px-2 text-center py-1 basis-[calc(50%-1rem)] border-2 rounded-lg cursor-pointer`}
                            >
                                <span className="text-[1.2rem] font-semibold">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductUserOptions;
