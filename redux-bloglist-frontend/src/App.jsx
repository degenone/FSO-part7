import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';
import { fetchBlogs, createBlog } from './reducers/blogsReducer';

const App = () => {
    const blogs = useSelector((state) => state.blogs);
    const [user, setUser] = useState(null);
    const blogFormRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    useEffect(() => {
        const userJSON = window.localStorage.getItem('loggedInBloglistUser');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const addBlog = async (blogObj) => {
        try {
            dispatch(createBlog(blogObj));
            dispatch(
                showNotification(
                    `Added a new blog item: ${blogObj.title} by ${blogObj.author}`
                )
            );
            blogFormRef.current.toggleVisibility();
            return true;
        } catch (error) {
            dispatch(showNotification('error creating a blog list item', true));
        }
        return false;
    };

    const likeBlog = async (id, blogOjb) => {
        try {
            const blog = await blogService.update(id, blogOjb);
            setBlogs(
                blogs.map((b) =>
                    b.id === blog.id ? { ...b, likes: blog.likes } : b
                )
            );
            dispatch(showNotification(`Liked blog '${blog.title}'`));
        } catch (error) {
            dispatch(showNotification('error liking blog item', true));
        }
    };

    const deleteBlog = async (id) => {
        const blog = blogs.find((b) => b.id === id);
        if (
            window.confirm(
                `Are you sure you want to remove "${blog.title}" by ${blog.author}`
            )
        ) {
            try {
                await blogService.deleteBlog(id);
                setBlogs(blogs.filter((b) => b.id !== id));
            } catch (error) {
                dispatch(
                    showNotification('error deleting blog list item', true)
                );
            }
        }
    };

    const handleLogin = async (userObj) => {
        try {
            const user = await loginService.login(userObj);
            window.localStorage.setItem(
                'loggedInBloglistUser',
                JSON.stringify(user)
            );
            setUser(user);
            blogService.setToken(user.token);
            return true;
        } catch (error) {
            dispatch(
                showNotification(
                    'Something went wrong... Check your credentials.',
                    true
                )
            );
            return false;
        }
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('loggedInBloglistUser');
    };

    return (
        <div>
            <Notification />
            {user === null ? (
                <LoginForm handleLogin={handleLogin} />
            ) : (
                <div>
                    <div className='titlePanel'>
                        <h2>My Blogs List</h2>
                        <p>User: {user.name}</p>
                        <button
                            id='btn-logout'
                            type='button'
                            onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                    <Togglable buttonLabel='Create New Item' ref={blogFormRef}>
                        <BlogForm addBlog={addBlog} />
                    </Togglable>
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            likeBlog={likeBlog}
                            deleteBlog={deleteBlog}
                            username={user.username}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
