import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getCountry = async (name) => {
  try {
    const rsp = await axios.get(`${baseUrl}/name/${name}`);
    return rsp.data;
  } catch (error) {
    return null;
  }
};

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

export const useCountry = (name) => {
  const [country, setCountry] = useState({ found: null, data: {} });

  useEffect(() => {
    if (!name && name !== null) {
      alert('pls enter text');
      return;
    }

    if (name === null) {
      return;
    }

    getCountry(name).then((data) => {
      setCountry({
        found: data?.name?.common ? true : false,
        data,
      });
    });
  }, [name]);

  return country;
};
