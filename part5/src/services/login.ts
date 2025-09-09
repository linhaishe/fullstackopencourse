import axios from 'axios';
const baseUrl = '/api/login';

const loginService = async (credentials: any) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default loginService;
