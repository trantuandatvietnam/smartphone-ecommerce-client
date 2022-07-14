import { createSlice } from '@reduxjs/toolkit';

const categoryInitialState = {
    categories: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState: categoryInitialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
            return state;
        },
    },
});

const reducer = categorySlice.reducer;
const { setCategories } = categorySlice.actions;
export default reducer;
export { setCategories };
