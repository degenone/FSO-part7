import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';

const BlogForm = (props) => {
    const { toggleVisibility } = props;
    const dispatch = useDispatch();
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
        dispatch(createBlog(blog));
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
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Create a new Blog List Item</legend>
                    <div className='formGroup'>
                        <label htmlFor='title'>Title:</label>
                        <input
                            placeholder='Blog title...'
                            required
                            {...title}
                        />
                    </div>
                    <div className='formGroup'>
                        <label htmlFor='author'>Author:</label>
                        <input
                            placeholder='Blog author...'
                            required
                            {...author}
                        />
                    </div>
                    <div className='formGroup'>
                        <label htmlFor='url'>Url:</label>
                        <input placeholder='Blog url...' required {...url} />
                    </div>
                    <div>
                        <input id='btn-create' type='submit' value='Create' />
                    </div>
                </fieldset>
            </form>
        </div>
    );
};
BlogForm.propTypes = { toggleVisibility: PropTypes.func.isRequired };

export default BlogForm;
