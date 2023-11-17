import BlogForm from './BlogForm';
import Togglable from './Togglable';
import BlogList from './BlogList';
import { useRef } from 'react';

const Blogs = () => {
    const blogFormRef = useRef(null);
    const toggleVisibility = () => blogFormRef.current.toggleVisibility();
    return (
        <div>
            <Togglable buttonLabel='Create New Item' ref={blogFormRef}>
                <BlogForm toggleVisibility={toggleVisibility} />
            </Togglable>
            <BlogList />
        </div>
    );
};

export default Blogs;
