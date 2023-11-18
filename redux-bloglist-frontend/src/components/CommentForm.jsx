import blogsService from '../services/blogs';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { appendComment } from '../reducers/blogsReducer';
import { useField } from '../hooks';
import { Icon, IconButton, Paper, TextField, Tooltip } from '@mui/material';

const CommentForm = (props) => {
    const { id } = props;
    const { reset, ...comment } = useField('text', 'comment');
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await blogsService.addComment(id, comment.value);
        dispatch(appendComment({ id, comment: comment.value }));
        reset();
    };
    return (
        <Paper elevation={2} sx={{ width: 'max-content', p: 2, my: 1 }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label='Add a comment:'
                    required
                    inputProps={{ minLength: 3 }}
                    {...comment}
                />
                <Tooltip title='Add comment'>
                    <IconButton
                        sx={{ color: 'success.main', my: 1, ml: 1 }}
                        type='submit'>
                        <Icon>add</Icon>
                    </IconButton>
                </Tooltip>
            </form>
        </Paper>
    );
};
CommentForm.propTypes = { id: PropTypes.string.isRequired };

export default CommentForm;
