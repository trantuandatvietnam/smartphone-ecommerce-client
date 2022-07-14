import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setThemeMode } from '../../redux/slice/darkModeSlice';

const ToggleTheme = () => {
    const dispatch = useDispatch();
    const [theme, setTheme] = useState(() => {
        const themeText = localStorage.getItem('theme') || 'light';
        return themeText;
    });
    const handleToggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
            dispatch(setThemeMode('dark'));
        }
        if (theme === 'dark') {
            setTheme('light');
            localStorage.setItem('theme', 'light');
            dispatch(setThemeMode('light'));
        }
    };
    return (
        <div className="flex items-center lg:justify-center gap-x-4">
            <span className="hidden lg:block">Sáng</span>
            <div
                onClick={handleToggleTheme}
                className={`group flex items-center ${
                    theme === 'light' ? 'justify-start' : 'justify-end'
                } transition-all cursor-pointer p-2 h-[2rem] w-[4rem] rounded-[1rem] bg-slate-100`}
            >
                <div
                    className={`h-[1.4rem] group-active:w-[1.6rem] ease-linear transition-all w-[1.4rem] rounded-full ${
                        theme === 'dark' ? 'bg-slate-500' : 'bg-red-500'
                    }`}
                ></div>
            </div>
            <span className="lg:block">Tối</span>
        </div>
    );
};

export default ToggleTheme;
