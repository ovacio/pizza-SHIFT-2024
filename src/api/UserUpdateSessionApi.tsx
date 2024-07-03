import { User } from '@/constants/interfaces';
import { ProfileUrl } from '@/constants/constants';
import axios from 'axios'
  

export const HandleUpdate = async (
    token: string | null,
    userData: {
      firstname: string;
      middlename: string;
      lastname: string;
      email: string;
      city: string;
      phone: string;
    },
    updateUserState: (user: User) => void,
    getSessionUser: (token: string | null) => void
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
      const response = await axios.patch(ProfileUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
        if (response.data.success === true) {
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