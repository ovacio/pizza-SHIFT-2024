import { patchUserProfile } from '@/api/imports';
import { putUserData } from '@/api/localStorage';

const useUpdateProfile = () => {
  const updateProfile = async (
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
    const data: Data = {
      profile: {
        firstname: userData.firstname,
        middlename: userData.middlename,
        lastname: userData.lastname,
        email: userData.email,
        city: userData.city,
      },
      phone: userData.phone,
    };

    const response = await patchUserProfile(data, token);

    if (response.success) {
      const updatedUser: User = {
        phone: data.phone,
        ...response.data.profile,
      };
      updateUserState(updatedUser);

      putUserData(updatedUser);

      getSessionUser(token);
    }
  };

  return { updateProfile };
};

export default useUpdateProfile;
