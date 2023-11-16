import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            blogService.setToken(action.payload.token);
            return action.payload;
        },
        removeUser: () => {
            blogService.setToken(null);
            return null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
