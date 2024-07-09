import { instance } from '@/api/instanse';

export const getPizzaOrders = async (token: string) => {
  const response = await instance.get<Orders>('/pizza/orders', {
    headers: {
        Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
