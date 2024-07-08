import { useState } from 'react';

import { getSessionUser } from '@/api/imports';
import { putUserData } from '@/api/localStorage';

const useSessionUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sessionUser = async (token: string) => {
    setLoading(true);
    const response = await getSessionUser(token);

    if (response.success) {
      setUser(response.user);
      putUserData(response.user)
    } else {
      setUser(null);
    }
  };

  return { user, loading, sessionUser };
};

export default useSessionUser;
