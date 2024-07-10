import { instance } from '@/api/instanse';

export const postPayment = async (requestConfig?: PostData) => {
  const response = await instance.post(`/pizza/payment`, requestConfig);

  return response.data;
};
