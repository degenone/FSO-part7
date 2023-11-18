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
        addBlogToUser: (state, action) => {
            const blog = action.payload;
            const user = state.users.find(
                (u) => u.username === state.active.username
            );
            user.blogs = [...user.blogs, blog];
            state.users = state.users.map((u) =>
                u.username === state.active.username ? user : u
            );
        },
        removeUsersBlog: (state, action) => {
            const blogId = action.payload;
            state.users = state.users.map((u) =>
                u.username === state.active.username
                    ? { ...u, blogs: u.blogs.filter((b) => b.id !== blogId) }
                    : u
            );
        },
    },
});

export const {
    setActive,
    removeActive,
    setUsers,
    addBlogToUser,
    removeUsersBlog,
} = userSlice.actions;

export const initializeUsers = () => async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
};

export default userSlice.reducer;
