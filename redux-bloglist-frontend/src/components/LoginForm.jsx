import { useDispatch } from 'react-redux';
import { setActive } from '../reducers/userReducer';
import { showNotification } from '../reducers/notificationReducer';
import loginService from '../services/login';
import { useField } from '../hooks';
import {
    Icon,
    TextField,
    Button,
    Paper,
    Typography,
    Tooltip,
} from '@mui/material';

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
        <Paper
            elevation={9}
            style={{ marginBlockStart: '10rem', paddingBlock: '3.5rem' }}>
            <form onSubmit={handleSubmit} style={{ marginInline: 'auto' }}>
                <fieldset style={{ paddingInline: '2rem' }}>
                    <legend>
                        <Typography variant='h6'>
                            Log in to the Bloglist Application
                        </Typography>
                    </legend>
                    <div className='formGroup'>
                        <TextField
                            label='Enter username:'
                            autoFocus={true}
                            required
                            inputProps={{ minLength: 3 }}
                            {...username}
                        />
                    </div>
                    <div className='formGroup'>
                        <TextField
                            label='Enter password:'
                            required
                            inputProps={{ minLength: 8 }}
                            {...password}
                        />
                    </div>
                    <div>
                        <Tooltip title='Login'>
                            <Button
                                id='btn-login'
                                variant='contained'
                                type='submit'>
                                <Icon>login</Icon>
                            </Button>
                        </Tooltip>
                    </div>
                </fieldset>
            </form>
        </Paper>
    );
};

export default LoginForm;
