import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog, deleteBlog } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';

const Blog = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.active);
    const blogs = useSelector((state) => state.blogs);
    const { id } = useParams();
    const blog = blogs.find((b) => b.id === id);
    const handleDeleteBlog = async () => {
        if (
            window.confirm(
                `Are you sure you want to remove "${blog.title}" by ${blog.author}`
            )
        ) {
            dispatch(deleteBlog(blog.id));
        }
    };
    const handleLikeBlog = async () => {
        dispatch(likeBlog(blog.id, { likes: blog.likes + 1 }));
        dispatch(showNotification(`Liked blog '${blog.title}'`));
    };
    if (!blog) return;
    return (
        <div>
            <h2>{blog.title}</h2>
            <h3>
                by <i>{blog.author}</i>
            </h3>
            <a href={blog.url}>{blog.url}</a>
            <div>
                <p>{blog.likes} likes</p>
                <button
                    type='button'
                    onClick={handleLikeBlog}
                    title='Like this blog'>
                    <i className='fa-solid fa-thumbs-up'></i>
                </button>
            </div>
            <p>Added by {blog.user.name}</p>
            {blog.user.username === user.username && (
                <button
                    className='btn-delete'
                    type='button'
                    onClick={handleDeleteBlog}
                    title='Delete this blog'>
                    <i className='fa-solid fa-trash'></i>
                </button>
            )}
        </div>
    );
};

export default Blog;
