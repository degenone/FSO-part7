import { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from './reducers/blogsReducer';
import { removeUser } from './reducers/userReducer';
import { setUser } from './reducers/userReducer';
import { Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import Blogs from './components/Blogs';

const App = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    useEffect(() => {
        const userJSON = window.localStorage.getItem('loggedInBloglistUser');
        if (userJSON) {
            const savedUser = JSON.parse(userJSON);
            dispatch(setUser(savedUser));
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(removeUser());
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
                        <Route path='/users' element={<Users />} />
                    </Routes>
                </div>
            )}
        </div>
    );
};

export default App;
