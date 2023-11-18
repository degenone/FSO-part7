import { useDispatch } from 'react-redux';
import { setActive } from '../reducers/userReducer';
import { showNotification } from '../reducers/notificationReducer';
import loginService from '../services/login';
import { useField } from '../hooks';

const LoginForm = () => {
    const dispatch = useDispatch();
    const { reset: usernameReset, ...username } = useField('text', 'username');
    const { reset: passwordReset, ...password } = useField(
        'password',
        'password'
    );
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await loginService.login({
            username: username.value,
            password: password.value,
        });
        if (user) {
            dispatch(setActive(user));
            window.localStorage.setItem(
                'loggedInBloglistUser',
                JSON.stringify(user)
            );
            usernameReset();
            passwordReset();
        } else {
            dispatch(
                showNotification(
                    'Something went wrong... Check your credentials.',
                    true
                )
            );
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Log in to the Bloglist Application</legend>
                    <div className='formGroup'>
                        <label htmlFor='username'>Enter username:</label>
                        <input required minLength={3} {...username} />
                    </div>
                    <div className='formGroup'>
                        <label htmlFor='password'>Enter password:</label>
                        <input required minLength={8} {...password} />
                    </div>
                    <div>
                        <input id='btn-login' type='submit' value='Login' />
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default LoginForm;
