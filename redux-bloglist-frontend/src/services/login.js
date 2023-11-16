import axios from 'axios';
const URL = '/api/login';

const login = async (creds) => {
    try {
        const resp = await axios.post(URL, creds);
        return resp.data;
    } catch (error) {
        return null;
    }
};

export default { login };
