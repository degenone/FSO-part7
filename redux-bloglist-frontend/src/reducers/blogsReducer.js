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
        updateBlog: (state, action) => {
            const updateObj = action.payload;
            return state.map((b) =>
                b.id === updateObj.id ? { ...b, likes: updateObj.likes } : b
            );
        },
        removeBlog: (state, action) => {
            const id = action.payload;
            return state.filter((b) => b.id !== id);
        },
    },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
    blogsSlice.actions;

export const fetchBlogs = () => async (dispatch) => {
    const data = await blogsService.getAll();
    dispatch(setBlogs(data));
};

export const createBlog = (blogObj) => async (dispatch) => {
    const data = await blogsService.create(blogObj);
    dispatch(appendBlog(data));
};

export const likeBlog = (id, updateObj) => async (dispatch) => {
    const data = await blogsService.update(id, updateObj);
    dispatch(updateBlog(data));
};

export const deleteBlog = (id) => async (dispatch) => {
    await blogsService.deleteBlog(id);
    dispatch(removeBlog(id));
};

export default blogsSlice.reducer;
