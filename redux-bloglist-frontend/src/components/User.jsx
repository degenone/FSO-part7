import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
    const users = useSelector((state) => state.users.users);
    const { id } = useParams();
    const user = users.find((u) => u.id === id);
    if (user === null) return;
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs:</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default User;
