import blogsService from '../services/blogs';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { appendComment } from '../reducers/blogsReducer';
import { useField } from '../hooks';

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
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='comment'>Add a comment:</label>
                <input required minLength={3} {...comment} />
                <input type='submit' value='Add' />
            </form>
        </div>
    );
};
CommentForm.propTypes = { id: PropTypes.string.isRequired };

export default CommentForm;
