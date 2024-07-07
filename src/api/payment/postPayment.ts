import { instance } from '../instanse';
import { API_URL } from '@/constants/constants';
import { PostData } from '@/types/interfacesApi';

export const postPayment = async (postData: PostData) => {
    await instance.post(`${API_URL}/pizza/payment`, postData)
};
