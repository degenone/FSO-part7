import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload;
        },
        appendBlog: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { setBlogs, appendBlog } = blogsSlice.actions;

export const fetchBlogs = () => async (dispatch) => {
    const data = await blogsService.getAll();
    dispatch(setBlogs(data));
};

export const createBlog = (blog) => async (dispatch) => {
    const data = await blogsService.create(blog);
    dispatch(appendBlog(data));
};

export default blogsSlice.reducer;
