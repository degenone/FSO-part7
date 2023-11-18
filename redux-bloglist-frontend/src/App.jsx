import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { fetchBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/userReducer';
import { setActive } from './reducers/userReducer';
import Users from './components/Users';
import User from './components/User';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import { Box, Container } from '@mui/material';
import Nav from './components/Nav';

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

    return (
        <Container maxWidth='md'>
            <Notification />
            {user === null ? (
                <LoginForm />
            ) : (
                <Box>
                    <Nav />
                    <Routes>
                        <Route path='/' element={<Blogs />} />
                        <Route path='/blogs/:id' element={<Blog />} />
                        <Route path='/users' element={<Users />} />
                        <Route path='/users/:id' element={<User />} />
                    </Routes>
                </Box>
            )}
        </Container>
    );
};

export default App;
