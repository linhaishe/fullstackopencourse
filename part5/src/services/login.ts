import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

// let token = null;

// const setToken = (newToken) => {
//   token = `Bearer ${newToken}`;
// };

const loginService = async (credentials: any) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default loginService;
