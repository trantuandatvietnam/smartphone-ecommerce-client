module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                blue: {
                    primary: '#60e3ff',
                    link: 'blue',
                    hover: '#73c6d9',
                },
                red: {
                    primary: '#d71a1a',
                },
                rgba: {
                    black: 'rgba(0, 0, 0, .3)',
                },
                yellow: {
                    primary: '#fff537',
                },
                warning: '#c0a900',
                error: 'red',
                success: '#00b700',
                primary: '#60e3ff',
                dark_bg: '#000',
                dark_category_bg: '#ccc',
                menu_color: '#00a0ff',
            },
        },
    },
    plugins: [],
};
