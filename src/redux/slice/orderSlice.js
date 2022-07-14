const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    orders: [],
};

const orderSlice = createSlice({
    initialState,
    name: 'order',
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        createOrder: (state, action) => {
            const newOrder = action.payload;
            state.orders = [...state.orders, newOrder];
        },
    },
});

const { createOrder, setOrders } = orderSlice.actions;
const reducer = orderSlice.reducer;

export { createOrder, setOrders };
export default reducer;
