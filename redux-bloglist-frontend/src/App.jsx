import { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from './reducers/blogsReducer';
import { removeActive, initializeUsers } from './reducers/userReducer';
import { setActive } from './reducers/userReducer';
import { Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import Blogs from './components/Blogs';
import Blog from './components/Blog';

const App = () => {
    const user = useSelector((state) => state.users.active);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);
    useEffect(() => {
        dispatch(initializeUsers());
    }, [dispatch]);
    useEffect(() => {
        const userJSON = window.localStorage.getItem('loggedInBloglistUser');
        if (userJSON) {
            const savedUser = JSON.parse(userJSON);
            dispatch(setActive(savedUser));
        }
    }, [dispatch]);
    const handleLogout = () => {
        dispatch(removeActive());
        window.localStorage.removeItem('loggedInBloglistUser');
    };
    return (
        <div>
            <Notification />
            {user === null ? (
                <LoginForm />
            ) : (
                <div>
                    <div className='titlePanel'>
                        <h2>My Blogs List</h2>
                        <p>
                            <i className='fa-solid fa-user'></i> {user.name}
                        </p>
                        <button
                            id='btn-logout'
                            type='button'
                            onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                    <Routes>
                        <Route path='/' element={<Blogs />} />
                        <Route path='/blogs/:id' element={<Blog />} />
                        <Route path='/users' element={<Users />} />
                        <Route path='/users/:id' element={<User />} />
                    </Routes>
                </div>
            )}
        </div>
    );
};

export default App;
