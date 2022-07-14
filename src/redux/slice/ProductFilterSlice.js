import { createSlice } from '@reduxjs/toolkit';

const inititalProductFilterState = {
    page: 1,
    sort: '',
};

const filterProductSlice = createSlice({
    initialState: inititalProductFilterState,
    name: 'filter',
    reducers: {
        setProductFilter: (state, action) => {
            state = { ...state, ...action.payload };
            return state;
        },
    },
});

const reducer = filterProductSlice.reducer;

const { setProductFilter } = filterProductSlice.actions;

export { setProductFilter };
export default reducer;
