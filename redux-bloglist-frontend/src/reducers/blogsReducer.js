import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';
import { showNotification } from './notificationReducer';

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
        appendComment: (state, action) => {
            const { id, comment } = action.payload;
            return state.map((b) =>
                b.id === id ? { ...b, comments: [...b.comments, comment] } : b
            );
        },
    },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog, appendComment } =
    blogsSlice.actions;

export const fetchBlogs = () => async (dispatch) => {
    const data = await blogsService.getAll();
    dispatch(setBlogs(data));
};

export const createBlog = (blogObj, user) => async (dispatch) => {
    const data = await blogsService.create(blogObj);
    if (data.error) {
        if (data.error.response.data.error === 'token expired') {
            dispatch(
                showNotification(
                    'Your token has expired, please log in again.',
                    true
                )
            );
        } else {
            dispatch(showNotification('error creating a blog list item', true));
        }
    } else {
        dispatch(appendBlog({ ...data, user }));
    }
};

export const likeBlog = (id, updateObj) => async (dispatch) => {
    const data = await blogsService.update(id, updateObj);
    if (data.error) {
        if (data.error.response.data.error === 'token expired') {
            dispatch(
                showNotification(
                    'Your token has expired, please log in again.',
                    true
                )
            );
        } else {
            dispatch(showNotification('error liking a blog list item', true));
        }
    } else {
        dispatch(updateBlog(data));
    }
};

export const deleteBlog = (id) => async (dispatch) => {
    const data = await blogsService.deleteBlog(id);
    if (data !== null && data.error) {
        if (data.error.response.data.error === 'token expired') {
            dispatch(
                showNotification(
                    'Your token has expired, please log in again.',
                    true
                )
            );
        } else {
            dispatch(showNotification('error deleting a blog list item', true));
        }
    } else {
        dispatch(removeBlog(id));
    }
};

export default blogsSlice.reducer;
