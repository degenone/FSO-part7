import { useSelector } from 'react-redux';
import BlogItem from './BlogItem';
import { Paper, Stack } from '@mui/material';

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs);
    return (
        <Paper variant='outlined' sx={{ p: 2, bgcolor: 'text.disabled' }}>
            <Stack spacing={1}>
                {[...blogs]
                    .sort((a, b) => {
                        if (a.likes > b.likes) return -1;
                        else if (a.likes < b.likes) return 1;
                        return 0;
                    })
                    .map((blog) => (
                        <BlogItem key={blog.id} blog={blog} />
                    ))}
            </Stack>
        </Paper>
    );
};

export default BlogList;
