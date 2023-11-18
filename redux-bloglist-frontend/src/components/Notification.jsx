import { Alert, AlertTitle } from '@mui/material';
import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector((state) => state.notification);
    if (notification === null) return;
    const severity = notification.isError ? 'error' : 'success';
    return (
        <Alert
            severity={severity}
            className='notification'
            sx={{ zIndex: 1000 }}>
            <AlertTitle>
                {notification.isError ? 'Error' : 'Success'}
            </AlertTitle>
            <p>{notification.message}</p>
        </Alert>
    );
};

export default Notification;
