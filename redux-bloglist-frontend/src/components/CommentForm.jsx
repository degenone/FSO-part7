import { useState } from 'react';
import blogsService from '../services/blogs';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { appendComment } from '../reducers/blogsReducer';

const CommentForm = (props) => {
    const { id } = props;
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await blogsService.addComment(id, comment);
        dispatch(appendComment({ id, comment }));
        setComment('');
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='comment'>Add a comment:</label>
                <input
                    type='text'
                    name='comment'
                    id='comment'
                    required
                    minLength={3}
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                />
                <input type='submit' value='Add' />
            </form>
        </div>
    );
};
CommentForm.propTypes = { id: PropTypes.string.isRequired };

export default CommentForm;
