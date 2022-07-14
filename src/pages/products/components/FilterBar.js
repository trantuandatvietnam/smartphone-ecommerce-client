import React from 'react';
import FilterBarList from './FilterBarList';

const FilterBar = () => {
    return (
        <div className="mb-8 bg-white sticky top-[-1px] z-10">
            <div className="flex items-center gap-x-4 mb-4">
                <i className="bx bx-filter-alt"></i>
                <span className="p-2">Lọc sản phẩm</span>
            </div>
            <FilterBarList />
        </div>
    );
};

export default FilterBar;
