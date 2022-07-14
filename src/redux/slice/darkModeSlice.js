import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    theme: localStorage.getItem('theme'),
};
const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        setThemeMode: (state, action) => {
            state.theme = action.payload;
        },
    },
});

const { reducer } = darkModeSlice;
export default reducer;

export const { setThemeMode } = darkModeSlice.actions;
