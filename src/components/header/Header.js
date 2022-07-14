import React from 'react';
import MidHeader from './components/MidHeader';
import TopHeader from './components/TopHeader';

const handleClickMenu = () => {
    const menuBtn = document.getElementById('header_menu');
    menuBtn?.classList?.toggle('translate-x-[-100%]');
};

const Header = () => {
    return (
        <div className="h-[14rem] bg-primary dark:bg-dark_bg dark:text-white header-shadow">
            <div className="wrapper">
                <div onClick={handleClickMenu} className="pt-4 inline-block md:hidden">
                    <i className="bx bx-menu-alt-left text-[3rem] lg:hidden"></i>
                </div>
                <TopHeader handleClickMenu={handleClickMenu} />
                <MidHeader />
            </div>
        </div>
    );
};

export default Header;
