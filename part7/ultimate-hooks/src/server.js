import axios from 'axios';

export const getAll = async (baseUrl) => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNew = async (baseUrl, content) => {
  const response = await axios.post(baseUrl, content);
  return response.data;
};
