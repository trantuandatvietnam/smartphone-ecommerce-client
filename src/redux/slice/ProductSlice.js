import { createSlice } from '@reduxjs/toolkit';
const initialProductState = {
    products: [],
};

const productSlice = createSlice({
    name: 'product',
    initialState: initialProductState,
    reducers: {
        setProduct: (state, action) => {
            state.products = action.payload;
        },
    },
});

const { setProduct } = productSlice.actions;
const reducer = productSlice.reducer;

export default reducer;
export { setProduct };
