import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import notifyApis from '../../../apis/notifyApis';
import toggleMenu from '../../../ultis/toggleMenu';
import ToggleTheme from '../../toggleTheme/ToggleTheme';

const topMenu = [
    {
        name: 'Liên hệ',
        path: '/contact',
    },
    {
        name: '|',
        path: '',
    },
    {
        name: 'Hợp tác',
        path: '/cooperate',
    },
];

const TopHeader = () => {
    // ref
    const languaDropdownRef = useRef(null);
    const languageBtn = useRef(null);

    // state
    const [notify, setNotify] = useState('');

    useEffect(() => {
        // handle toggle menu when user click
        const mouseDownEvent = window.addEventListener('mousedown', (e) => {
            toggleMenu(languageBtn, languaDropdownRef, e.target);
        });

        // get notify content from database
        (async function getNotify() {
            const res = await notifyApis.getNotify();
            const notifies = res?.notifies?.map((notify) => {
                return notify.content;
            });
            setNotify(notifies?.toString());
        })();

        return () => {
            window.removeEventListener('click', mouseDownEvent);
        };
    }, []);

    return (
        <div
            id="header_menu"
            className="fixed transition-all translate-x-[-100%] top-16 rounded-[1rem] left-0 flex flex-col w-[20rem] p-4 h-full bg-menu_color z-50 gap-y-4 md:p-0 md:w-full md:bg-transparent md:flex-row md:translate-x-0 md:static md:flex md:items-center md:justify-between md:rounded-[0rem] md:text-[1.4rem]"
        >
            <ul className="flex z-50 flex-col gap-y-4 md:flex-row md:gap-y-0 md:items-center md:justify-between md:gap-3 md:flex">
                {topMenu?.map((item, index) => (
                    <li key={index} className={item.path === '' ? 'hidden' : ''}>
                        {item.path ? (
                            <Link className="text-black dark:text-white" to={item.path}>
                                {item.name}
                            </Link>
                        ) : (
                            item.path
                        )}
                    </li>
                ))}
            </ul>
            <div className="marquee hidden p-4 z-10 lg:w-[55rem] md:w-[30rem] md:block">
                {/* show 2 words in two seconds */}
                <p
                    style={{ animationDuration: notify ? `${Math.ceil(notify?.split(' ').length / 2)}s` : 0 }}
                    className="flex items-center z-10"
                >
                    <i className="bx bx-pin text-red-primary mr-4"></i>
                    <span>{notify}</span>
                </p>
            </div>
            <ul className="flex z-50 flex-col md:flex-row md:items-center md:justify-between gap-3">
                <li>
                    <Link className="text-black dark:text-white" to="/provision">
                        Điều khoản
                    </Link>
                </li>
                <li className="text-[#d1d1d1] hidden md:block">|</li>
                <li ref={languageBtn} className="relative">
                    <div className="flex items-center md:justify-center gap-x-1 cursor-pointer">
                        Ngôn ngữ
                        <i className="bx bxs-chevron-down"></i>
                    </div>
                    <ul
                        ref={languaDropdownRef}
                        className="z-10 absolute top-10 right-0 w-full rounded-lg dark:bg-black dark:text-white dark:header-shadow bg-blue-primary shadow-box overflow-hidden scale-y-0 transition-transform origin-top-right"
                    >
                        <li className="p-2 cursor-pointer dark:hover:bg-slate-600 hover:bg-[#a3bcc3]">Tiếng Việt</li>
                        <li className="p-2 cursor-pointer dark:hover:bg-slate-600 hover:bg-[#a3bcc3]">English</li>
                    </ul>
                </li>
                <li className="text-[#d1d1d1] hidden md:block">|</li>
                <ToggleTheme />
            </ul>
        </div>
    );
};

export default TopHeader;
