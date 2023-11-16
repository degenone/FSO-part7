import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector((state) => state.notification);
    if (notification === null) return;
    return (
        <div className={`notification${notification.isError ? ' error' : ''}`}>
            {notification.message}
        </div>
    );
};

export default Notification;
