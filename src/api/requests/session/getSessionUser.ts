import { instance } from '@/api/instanse';

export const getSessionUser = async (token: string) => {
  const response = await instance.get<SessionResponse>(`/users/session`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data
};
