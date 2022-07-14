import React from 'react';
import FilterDropDownItem from './FilterDropDownItem';

const filterDataFake = [
    {
        name: 'Sắp xếp',
        filter: [
            { textContent: 'Tắng dần', keySort: 'price' },
            { textContent: 'Giảm dần', keySort: '-price' },
            { textContent: 'Mới nhất', keySort: '' },
            { textContent: 'Cũ nhất', keySort: 'oldest' },
            { textContent: 'Bán chạy', keySort: 'sold' },
        ],
    },
];

const FilterBarList = () => {
    return (
        <ul className="flex items-center justify-start bg-blue-primary rounded-lg">
            {filterDataFake.map((filterName, index) => (
                <FilterDropDownItem filterName={filterName} key={index} />
            ))}
        </ul>
    );
};

export default FilterBarList;
