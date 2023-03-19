import axios from "axios";
const baseUrl = "/api/person";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = (deleteId) => {
  return axios.delete(`${baseUrl}/${deleteId}`);
};

export default { getAll, create, update, deletePerson };
