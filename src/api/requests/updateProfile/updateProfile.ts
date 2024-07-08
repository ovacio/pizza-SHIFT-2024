import axios from 'axios';

import { User } from '@/types/interfacesApi';
import { API_URL } from '@/constants/constants';

export const updateProfile = async (
  token: string,
  userData: {
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    city: string;
    phone: string;
  },
  updateUserState: (user: User) => void,
  getSessionUser: (token: string) => void,
) => {
  const data = {
    profile: {
      firstname: userData.firstname,
      middlename: userData.middlename,
      lastname: userData.lastname,
      email: userData.email,
      city: userData.city,
    },
    phone: userData.phone,
  };

  try {
    const response = await axios.patch(`${API_URL}/users/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      const updatedUser: User = {
        phone: data.phone,
        ...response.data.profile,
      };
      updateUserState(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      getSessionUser(token);
    }
  } catch (error) {
    console.error(error);
  }
};
