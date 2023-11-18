import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Icon,
    Typography,
    Paper,
    Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeActive } from '../reducers/userReducer';
import { Link } from 'react-router-dom';

const Nav = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.active);
    const handleLogout = () => {
        dispatch(removeActive());
        window.localStorage.removeItem('loggedInBloglistUser');
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ bgcolor: 'text.secondary', position: 'static' }}>
                <Toolbar>
                    <Button
                        component={Link}
                        variant='text'
                        color='inherit'
                        to='/'>
                        Blogs
                    </Button>
                    <Button
                        component={Link}
                        variant='text'
                        color='inherit'
                        to='/users'>
                        Users
                    </Button>
                    <Paper className='active-user'>
                        <Icon>account_circle</Icon>
                        <Typography variant='inherit'>{user.name}</Typography>
                        <Tooltip title='Log Out'>
                            <Button
                                id='btn-logout'
                                onClick={handleLogout}
                                color='warning'
                                variant='contained'>
                                <Icon>logout</Icon>
                            </Button>
                        </Tooltip>
                    </Paper>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Nav;
