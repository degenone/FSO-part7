import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import usersService from '../services/users';

const initialState = {
    active: null,
    users: [],
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setActive: (state, action) => {
            blogService.setToken(action.payload.token);
            state.active = action.payload;
        },
        removeActive: (state) => {
            blogService.setToken(null);
            state.active = null;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { setActive, removeActive, setUsers } = userSlice.actions;

export const initializeUsers = () => async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
};

export default userSlice.reducer;
