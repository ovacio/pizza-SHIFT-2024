import { useState } from 'react';
import { instance } from '@/api/instanse';
import { API_URL } from '@/constants/constants';
import { User, SessionResponse } from '@/types/interfacesApi';

const useSessionUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getSessionUser = async (token: string | null) => {
    setLoading(true);
    const response = await instance.get<SessionResponse>(`${API_URL}/users/session`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } else {
      setUser(null);
    }
  };

  return { user, loading, getSessionUser };
};

export default useSessionUser;
