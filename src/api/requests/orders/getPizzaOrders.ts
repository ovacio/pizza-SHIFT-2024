import { instance } from '@/api/instanse';

export const getPizzaOrders = async (token: string) => {
  const response = await instance.get<OrdersResponse>('/pizza/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
