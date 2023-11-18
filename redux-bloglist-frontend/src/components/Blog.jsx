import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { likeBlog, deleteBlog } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';
import { removeUsersBlog } from '../reducers/userReducer';
import CommentForm from './CommentForm';
import {
    Box,
    Card,
    Icon,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';

const Blog = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
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
            dispatch(removeUsersBlog(blog.id));
            navigation('/');
        }
    };
    const handleLikeBlog = async () => {
        dispatch(likeBlog(blog.id, { likes: blog.likes + 1 }));
        dispatch(showNotification(`Liked blog '${blog.title}'`));
    };
    if (!blog) return;
    return (
        <Card variant='outlined' sx={{ mt: 1, px: 2, pb: 1 }}>
            <Typography variant='h2' sx={{ mb: 1 }}>
                {blog.title}
            </Typography>
            <Typography variant='h4'>
                by <i>{blog.author}</i>
            </Typography>
            <Typography>
                <Link to={blog.url}>{blog.url}</Link>
            </Typography>
            <Box>
                <Typography>{blog.likes} likes</Typography>
                <Tooltip title='Like this blog'>
                    <IconButton
                        sx={{ color: 'success.main' }}
                        onClick={handleLikeBlog}>
                        <Icon>thumb_up</Icon>
                    </IconButton>
                </Tooltip>
            </Box>
            <p>Added by {blog.user.name}</p>
            {blog.user.username === user.username && (
                <Tooltip title='Delete this blog'>
                    <IconButton
                        sx={{ color: 'error.main' }}
                        className='btn-delete'
                        onClick={handleDeleteBlog}>
                        <Icon>delete</Icon>
                    </IconButton>
                </Tooltip>
            )}
            <div>
                <Typography variant='h4'>Comments:</Typography>
                <CommentForm id={blog.id} />
                <Paper
                    variant='outlined'
                    sx={{ p: 2, bgcolor: 'text.disabled' }}>
                    <Stack spacing={1}>
                        {blog.comments.map((comment, i) => (
                            <Paper sx={{ p: 1 }} key={`${comment}-${i}`}>
                                {comment}
                            </Paper>
                        ))}
                    </Stack>
                </Paper>
            </div>
        </Card>
    );
};

export default Blog;
