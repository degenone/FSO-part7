import BlogForm from './BlogForm';
import Togglable from './Togglable';
import BlogList from './BlogList';
import { useRef } from 'react';
import { Box, Typography } from '@mui/material';

const Blogs = () => {
    const blogFormRef = useRef(null);
    const toggleVisibility = () => blogFormRef.current.toggleVisibility();
    return (
        <Box>
            <Typography variant='h2' sx={{ mb: 1 }}>
                Blogs App
            </Typography>
            <Togglable buttonLabel='Create New Item' ref={blogFormRef}>
                <BlogForm toggleVisibility={toggleVisibility} />
            </Togglable>
            <BlogList />
        </Box>
    );
};

export default Blogs;
