import axios from 'axios';
const URL = '/api/blogs';

let token = null;

const setToken = (value) => (token = `Bearer ${value}`);

const getAll = async () => {
    const resp = await axios.get(URL);
    return resp.data;
};

const create = async (blogObj) => {
    try {
        const resp = await axios.post(URL, blogObj, {
            headers: { Authorization: token },
        });
        return resp.data;
    } catch (error) {
        return { error: error };
    }
};

const update = async (id, updateObj) => {
    try {
        const resp = await axios.put(`${URL}/${id}`, updateObj, {
            headers: { Authorization: token },
        });
        return resp.data;
    } catch (error) {
        return { error: error };
    }
};

const deleteBlog = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`, {
            headers: { Authorization: token },
        });
        return null;
    } catch (error) {
        return { error: error };
    }
};

const addComment = async (id, comment) => {
    await axios.post(`${URL}/${id}/comments`, { comment });
};

export default { getAll, create, update, deleteBlog, setToken, addComment };
