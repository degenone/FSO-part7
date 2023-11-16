import { useEffect, useRef } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from './reducers/blogsReducer';
import BlogList from './components/BlogList';
import { removeUser } from './reducers/userReducer';
import setUser from './reducers/userReducer';

const App = () => {
    const user = useSelector(state => state.user);
    const blogFormRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    useEffect(() => {
        const userJSON = window.localStorage.getItem('loggedInBloglistUser');
        if (userJSON) {
            const savedUser = JSON.parse(userJSON);
            dispatch(setUser(savedUser));
            blogService.setToken(savedUser.token);
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(removeUser());
        window.localStorage.removeItem('loggedInBloglistUser');
        blogService.setToken(null);
    };

    const toggleVisibility = () => blogFormRef.current.toggleVisibility();

    return (
        <div>
            <Notification />
            {user === null ? (
                <LoginForm />
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
                    <BlogList />
                </div>
            )}
        </div>
    );
};

export default App;
