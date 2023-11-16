import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { showNotification } from '../reducers/notificationReducer';
import loginService from '../services/login';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await loginService.login({
            username,
            password,
        });
        if (user) {
            dispatch(setUser(user));
            window.localStorage.setItem(
                'loggedInBloglistUser',
                JSON.stringify(user)
            );
            setUsername('');
            setPassword('');
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
                        <input
                            type='text'
                            name='username'
                            id='username'
                            required
                            minLength={3}
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div className='formGroup'>
                        <label htmlFor='password'>Enter password:</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            required
                            minLength={8}
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
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
