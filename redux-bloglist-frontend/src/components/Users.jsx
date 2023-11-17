import { useEffect, useState } from 'react';
import usersService from '../services/users';

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const data = await usersService.getAll();
            setUsers(data);
        };
        fetchUsers();
    }, []);
    return (
        <div>
            <h2>Users</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.username}>
                                <td>{user.name}</td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
