import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';

const BlogForm = (props) => {
    const { toggleVisibility } = props;
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const blog = {
            title,
            author,
            url,
        };
        try {
            dispatch(createBlog(blog));
            dispatch(
                showNotification(`Added a new blog item: ${title} by ${author}`)
            );
            toggleVisibility();
            setTitle('');
            setAuthor('');
            setUrl('');
        } catch (error) {
            dispatch(showNotification('error creating a blog list item', true));
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Create a new Blog List Item</legend>
                    <div className='formGroup'>
                        <label htmlFor='title'>Title:</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            value={title}
                            placeholder='Blog title...'
                            onChange={({ target }) => setTitle(target.value)}
                            required
                        />
                    </div>
                    <div className='formGroup'>
                        <label htmlFor='author'>Author:</label>
                        <input
                            type='text'
                            name='author'
                            id='author'
                            value={author}
                            placeholder='Blog author...'
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div className='formGroup'>
                        <label htmlFor='url'>Url:</label>
                        <input
                            type='text'
                            name='url'
                            id='url'
                            value={url}
                            placeholder='Blog url...'
                            onChange={({ target }) => setUrl(target.value)}
                            required
                        />
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
