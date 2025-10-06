import axios from 'axios';
import { Diary, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Diary>(`${apiBaseUrl}/patients`, object);

  return data;
};

export default {
  getAll,
  create,
};
