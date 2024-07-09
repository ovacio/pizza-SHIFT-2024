import { instance } from '@/api/instanse';

export const postSignIn = async (phone: string, code: number) => {
  const response = await instance.post<SignIn>('/users/signin', { phone: phone, code: code });

  return response.data;
};
