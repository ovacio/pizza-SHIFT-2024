import { instance } from '@/api/instanse';

export const postPayment = async (requestConfig?: PostData) => {
    await instance.post(`/pizza/payment`, requestConfig)
};
