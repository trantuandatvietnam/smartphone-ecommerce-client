import React from 'react';

const Title = ({ children, size = '2rem' }) => {
    return <div className={`text-[${size}] dark:text-white font-medium flex items-center gap-2 mb-4`}>{children}</div>;
};

export default Title;
