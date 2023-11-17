import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { showNotification } from '../reducers/notificationReducer';
import { likeBlog, deleteBlog } from '../reducers/blogsReducer';
import PropTypes from 'prop-types';

const Blog = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.active);
    const { blog } = props;
    const [visible, setVisible] = useState(false);
    const blogStyle = {
        paddingTop: '0.4rem',
        paddingBottom: '0.4rem',
        paddingLeft: '0.5rem',
        border: 'dashed',
        borderWidth: '2px',
        marginBottom: 5,
    };
    const handleLikeBlog = async () => {
        dispatch(likeBlog(blog.id, { likes: blog.likes + 1 }));
        dispatch(showNotification(`Liked blog '${blog.title}'`));
    };
    const handleDeleteBlog = async () => {
        if (
            window.confirm(
                `Are you sure you want to remove "${blog.title}" by ${blog.author}`
            )
        ) {
            dispatch(deleteBlog(blog.id));
        }
    };
    return (
        <div style={blogStyle}>
            <div className='blog-header'>
                <strong>{blog.title}</strong> by <i>{blog.author}</i>{' '}
                <button
                    className='btn-toggle'
                    type='button'
                    onClick={() => setVisible(!visible)}>
                    {visible ? 'Hide' : 'View'}
                </button>
            </div>
            <div className={`blog-details${visible ? '' : ' hidden'}`}>
                <p className='blog-url'>
                    <a href={blog.url} target='_blank' rel='noreferrer'>
                        {blog.url}
                    </a>
                </p>
                <p className='blog-likes'>
                    Likes: {blog.likes}{' '}
                    <button
                        className='btn-like'
                        type='button'
                        onClick={handleLikeBlog}>
                        Like
                    </button>
                </p>
                <p>{blog.user.name}</p>
                {blog.user.username === user.username && (
                    <button
                        className='btn-delete'
                        type='button'
                        onClick={handleDeleteBlog}>
                        Delete This
                    </button>
                )}
            </div>
        </div>
    );
};
Blog.propTypes = {
    blog: PropTypes.object.isRequired,
};

export default Blog;
