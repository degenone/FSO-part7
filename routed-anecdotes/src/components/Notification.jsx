export const Notification = (props) => {
    const { message } = props;
    const style = {
        border: '1px solid hsla(0, 0%, 0%, 0.5)',
        padding: '0.5rem 1rem',
        marginBlock: '0.5rem',
    };
    return (
        <div style={style}>
            <strong>{message}</strong>
        </div>
    );
};
