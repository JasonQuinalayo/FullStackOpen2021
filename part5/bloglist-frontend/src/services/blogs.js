import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;
const config = {
  headers: { Authorization: token },
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  config.headers = { Authorization: token };
};

const addBlog = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateBlog = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default {
  getAll, setToken, addBlog, updateBlog, deleteBlog,
};
