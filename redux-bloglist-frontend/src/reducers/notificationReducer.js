import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        set: (state, action) => {
            return action.payload;
        },
        reset: () => {
            return null;
        },
    },
});

export const { set, reset } = notificationSlice.actions;

export const showNotification =
    (message, isError = false) =>
    (dispatch) => {
        dispatch(set({ message, isError }));
        setTimeout(() => {
            dispatch(reset());
        }, 3500);
    };

export default notificationSlice.reducer;
