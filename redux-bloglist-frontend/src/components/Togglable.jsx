import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Icon, IconButton, Tooltip } from '@mui/material';

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => setVisible(!visible);
    const { buttonLabel, children } = props;
    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    });
    return (
        <Box>
            <Box className={`togglable-header${visible ? ' hidden' : ''}`}>
                <Button
                    sx={{ my: 1 }}
                    className='btn-show'
                    variant='outlined'
                    onClick={toggleVisibility}>
                    {buttonLabel}
                </Button>
            </Box>
            <Box className={`togglable-content${visible ? '' : ' hidden'}`}>
                {children}
                <Tooltip title='Cancel'>
                    <IconButton
                        sx={{ color: 'info.main', my: 1, mx: 2 }}
                        className='btn-hide'
                        onClick={toggleVisibility}>
                        <Icon>backspace</Icon>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
});
Togglable.displayName = 'Togglable';
Togglable.propTypes = { buttonLabel: PropTypes.string.isRequired };

export default Togglable;
