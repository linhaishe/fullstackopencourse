import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/users';

const usersService = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default usersService;
