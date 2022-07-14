import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isShowToast: false,
    type: 'success',
    message: '',
    delay: 5000,
};
const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        updateToast: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

const { updateToast } = toastSlice.actions;
const reducer = toastSlice.reducer;

export { updateToast };
export default reducer;
