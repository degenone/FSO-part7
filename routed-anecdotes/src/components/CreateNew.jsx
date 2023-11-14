import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

export const CreateNew = (props) => {
    const { addNew } = props;
    const navigate = useNavigate();
    const { reset: contentReset, ...content } = useField('text');
    const { reset: authorReset, ...author } = useField('text');
    const { reset: infoReset, ...info } = useField('text');
    const handleSubmit = (e) => {
        e.preventDefault();
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
        });
        navigate('/');
    };
    const handleReset = () => {
        contentReset();
        authorReset();
        infoReset();
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset style={{ width: 'max-content' }}>
                    <legend>Create a new anecdote</legend>
                    <div>
                        <label htmlFor='content'>content</label>
                        <input
                            name='content'
                            id='content'
                            {...content}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='author'>author</label>
                        <input name='author' id='author' {...author} required />
                    </div>
                    <div>
                        <label htmlFor='info'>url for more info</label>
                        <input name='info' id='info' {...info} required />
                    </div>
                    <div>
                        <button type='submit'>create</button>
                        <button type='button' onClick={handleReset}>
                            reset
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};
