import { useState, useEffect } from 'react';
import { getAll, createNew } from './server';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const fetchData = async () => {
    try {
      const rsp = await getAll(baseUrl);
      setResources(rsp);
    } catch (error) {
      setResources([]);
    }
  };

  const addData = async (content) => {
    try {
      await createNew(baseUrl, content);
      fetchData();
    } catch (error) {}
  };

  useEffect(() => {
    if (!baseUrl) {
      return;
    }

    fetchData();
  }, []);

  const create = (resource) => {
    addData(resource);
  };

  const service = {
    create,
  };

  return [resources, service];
};
