import { instance } from '@/api/instanse';

export const patchUserProfile = async (data: Data, token: string) => {
  const response = await instance.patch('/users/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
