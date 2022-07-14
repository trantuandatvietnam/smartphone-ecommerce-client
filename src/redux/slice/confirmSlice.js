import { createSlice } from '@reduxjs/toolkit';

const inititalConfirmState = {
    isShow: false,
    status: false,
};

const confirmSlice = createSlice({
    initialState: inititalConfirmState,
    name: 'confirm',
    reducers: {
        updateConfirm: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

const { updateConfirm } = confirmSlice.actions;

export { updateConfirm };
export default confirmSlice.reducer;
