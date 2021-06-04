import { useEffect, useState } from 'react';
import axios from 'axios';

const initialState = {
  name: '',
  description: '',
  price: 0,
  inStock: 0,
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: number;
};

export const isNew = (id: string) => id === 'new';

export const useProducts = (id?: string) => {
  const [data, setData] = useState([]);
  const [single, setSingle] = useState<Record<string, any>>(initialState);

  const getSingle = async (id: string) => {
    if (!isNew(id)) {
      const response = await axios.get(`http://localhost:8080/api/product/${id}`);
      setSingle({ ...response.data });
    }
  };

  const getData = async () => {
    const response = await axios.get('http://localhost:8080/api/product');
    setData(response.data);
  };

  const destroy = async (id: string) => {
    await axios.delete(`http://localhost:8080/api/product/${id}`);
    getData();
  };

  const create = async (formData: FormData) => {
    await axios.post('http://localhost:8080/api/product', formData);
  };

  const edit = async () => {
    axios.put(`http://localhost:8080/api/product/${id}`, { ...single });
  };

  useEffect(() => {
    getData();
    if (id && !isNew(id)) {
      getSingle(id);
    }
  }, [id]);

  return {
    data,
    destroy,
    create,
    edit,
    single,
    setSingle,
  };
};
