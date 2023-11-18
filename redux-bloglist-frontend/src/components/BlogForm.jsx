import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';
import { addBlogToUser } from '../reducers/userReducer';
import { useField } from '../hooks';
import {
    Box,
    Icon,
    IconButton,
    Paper,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

const BlogForm = (props) => {
    const { toggleVisibility } = props;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.active);
    const { reset: titleReset, ...title } = useField('text', 'title');
    const { reset: authorReset, ...author } = useField('text', 'author');
    const { reset: urlReset, ...url } = useField('text', 'url');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const blog = {
            title: title.value,
            author: author.value,
            url: url.value,
        };
        dispatch(createBlog(blog, user));
        dispatch(addBlogToUser(blog));
        dispatch(
            showNotification(
                `Added a new blog item: ${title.value} by ${author.value}`
            )
        );
        toggleVisibility();
        titleReset();
        authorReset();
        urlReset();
    };
    return (
        <Paper elevation={5} sx={{ width: 'max-content', p: 2 }}>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>
                        <Typography variant='h6'>
                            Create a new Blog List Item
                        </Typography>
                    </legend>
                    <Box className='formGroup'>
                        <TextField label='Blog title...' required {...title} />
                    </Box>
                    <Box className='formGroup'>
                        <TextField
                            label='Blog author...'
                            required
                            {...author}
                        />
                    </Box>
                    <Box className='formGroup'>
                        <TextField label='Blog url...' required {...url} />
                    </Box>
                    <Box>
                        <Tooltip title='Create'>
                            <IconButton
                                id='btn-create'
                                type='submit'
                                sx={{ color: 'success.main' }}>
                                <Icon>save</Icon>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </fieldset>
            </form>
        </Paper>
    );
};
BlogForm.propTypes = { toggleVisibility: PropTypes.func.isRequired };

export default BlogForm;
