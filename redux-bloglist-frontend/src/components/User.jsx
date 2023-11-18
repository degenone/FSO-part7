import { Box, Paper, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
    const users = useSelector((state) => state.users.users);
    const { id } = useParams();
    const user = users.find((u) => u.id === id);
    if (!user) return;
    return (
        <Box>
            <Typography variant='h2' sx={{ mb: 1 }}>
                {user.name}
            </Typography>
            <Typography variant='h4'>Added blogs:</Typography>
            <Paper variant='outlined' sx={{ p: 2, bgcolor: 'text.disabled' }}>
                <Stack spacing={1}>
                    {user.blogs.map((blog) => (
                        <Paper sx={{ p: 1 }} key={`${blog.id}-${blog.author}`}>
                            <Typography to={`/blogs/${blog.id}`}>
                                {blog.title}
                            </Typography>
                        </Paper>
                    ))}
                </Stack>
            </Paper>
        </Box>
    );
};

export default User;
