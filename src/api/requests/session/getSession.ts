import { useState } from 'react';

import { instance } from '@/api/instanse';
import { putUserData } from '@/api/localStorage';

const useSessionUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getSessionUser = async (token: string) => {
    setLoading(true);
    const response = await instance.get<SessionResponse>(`/users/session`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      setUser(response.data.user);
      putUserData(response.data.user)
    } else {
      setUser(null);
    }
  };

  return { user, loading, getSessionUser };
};

export default useSessionUser;
