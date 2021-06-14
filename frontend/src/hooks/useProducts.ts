import { useEffect, useState } from 'react';
import axios from 'axios';
import { authHeader } from '../helper/auth';

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
      const response = await axios.get(`/api/product/${id}`, authHeader());
      setSingle({ ...response.data });
    }
  };

  const getData = async () => {
    const response = await axios.get(`/api/product`, authHeader());
    setData(response.data);
  };

  const destroy = async (id: string) => {
    await axios.delete(`/api/product/${id}`, authHeader());
    getData();
  };

  const create = async (formData: FormData) => {
    await axios.post(`/api/product`, formData, authHeader());
  };

  const edit = async () => {
    axios.put(`/api/product/${id}`, { ...single }, authHeader());
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
