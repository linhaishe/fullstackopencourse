import axios from 'axios';
import type { IBlog } from '../components/types';

const baseUrl = '/api/blogs';
let token: string | null = null;

const setToken = (newToken: string | null) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = token ? { headers: { Authorization: token } } : {};
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const create = async (newObject: IBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id: string, newObject: IBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteBlog = (id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken, deleteBlog };
