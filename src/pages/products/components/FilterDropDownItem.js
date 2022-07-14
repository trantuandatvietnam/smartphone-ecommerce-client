import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toggleMenu from '../../../ultis/toggleMenu';

const FilterDropDownItem = ({ filterName }) => {
    const navigate = useNavigate();
    const filterDropDownRef = useRef(null);
    const filterDropContentRef = useRef(null);

    const handleChangeSort = (keySort) => {
        navigate(`/products/mobile/sort=${keySort}`);
    };
    useEffect(() => {
        // handle toggle menu when user click
        const mouseDownEvent = window.addEventListener('mousedown', (e) => {
            toggleMenu(filterDropDownRef, filterDropContentRef, e.target);
        });

        return () => {
            window.removeEventListener('click', mouseDownEvent);
        };
    }, []);
    return (
        <li ref={filterDropDownRef} className="p-4 flex items-center cursor-pointer relative">
            <span>{filterName.name}</span>
            <i className="bx bx-chevron-down"></i>
            <div
                ref={filterDropContentRef}
                className="triangle max-w-[30rem] absolute bg-blue-primary p-3 mr-[-8px] ml-[-8px] top-[calc(100%+1rem)] rounded-lg w-max flex items-center flex-wrap scale-y-0 transition-transform origin-top-right"
            >
                {filterName.filter.map((filter) => (
                    <div
                        onMouseDown={() => handleChangeSort(filter.keySort)}
                        className="p-[8px] w-max overflow-hidden"
                        key={filter.textContent}
                    >
                        <span className="bg-white block p-3 rounded-lg">{filter.textContent}</span>
                    </div>
                ))}
            </div>
        </li>
    );
};

export default FilterDropDownItem;
