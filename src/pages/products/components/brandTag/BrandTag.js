import React from 'react';
import './brand-tag.css';

const BrandTag = ({ brandName }) => {
    return (
        <div className="brand-tag">
            <h3 className="brand-name">{brandName}</h3>
        </div>
    );
};

export default BrandTag;
