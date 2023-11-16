import axios from 'axios';
const URL = '/api/blogs';

let token = null;

const setToken = (value) => (token = `Bearer ${value}`);

const getAll = async () => {
    const resp = await axios.get(URL);
    return resp.data;
};

const create = async (blogObj) => {
    const resp = await axios.post(URL, blogObj, {
        headers: { Authorization: token },
    });
    return resp.data;
};

const update = async (id, updateObj) => {
    const resp = await axios.put(`${URL}/${id}`, updateObj, {
        headers: { Authorization: token },
    });
    return resp.data;
};

const deleteBlog = async (id) => {
    await axios.delete(`${URL}/${id}`, {
        headers: { Authorization: token },
    });
};

export default { getAll, create, update, deleteBlog, setToken };
