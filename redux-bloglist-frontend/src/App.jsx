import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';
import { fetchBlogs } from './reducers/blogsReducer';
import BlogList from './components/BlogList';

const App = () => {
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

    const toggleVisibility = () => blogFormRef.current.toggleVisibility();

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
                        <BlogForm toggleVisibility={toggleVisibility} />
                    </Togglable>
                    <BlogList username={user.username} />
                </div>
            )}
        </div>
    );
};

export default App;
