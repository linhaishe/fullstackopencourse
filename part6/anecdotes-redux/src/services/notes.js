import axios from 'axios';
import { asObject } from '../const';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = asObject(content);
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const voteNote = async (id, votes) => {
  const response = await axios.patch(`${baseUrl}/${id}`, { votes });
  return response.data;
};

export default { getAll, createNew, voteNote };
