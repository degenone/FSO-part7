import axios from 'axios';
const URL = '/api/users';

const getAll = async () => {
    const resp = await axios.get(URL);
    return resp.data;
};

export default { getAll };
