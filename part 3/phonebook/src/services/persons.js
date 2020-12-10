import axios from "axios";
// const baseUrl = "http://localhost:3001/persons";
//建立后端后，此页面没有效果了
const baseUrl = "/persons";

const getAll = () => {
  return axios.get(baseUrl);
  // const request = axios.get(baseUrl);
  // return request.then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
  // const request = axios.post(baseUrl, newObject);
  // return request.then((response) => response.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
  // const request = axios.put(`${baseUrl}/${id}`, newObject);
  // return request.then((response) => response.data);
};

const deleteperson = (deleteId) => {
  return axios.delete(`${baseUrl}/${deleteId}`);
  // const request = axios.delete(`${baseUrl}/${deleteId}`);
  // return request.then((response) => response.data);
};

export default { getAll, create, update, deleteperson };
