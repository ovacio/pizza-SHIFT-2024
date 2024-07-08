import { useState, useEffect } from 'react';

import { useSessionUser, updateProfile } from '@/api/imports';
import { getUserData } from '@/api/localStorage';
import { User } from '@/types/interfacesApi';

import './profile.scss';

const UserProfile = () => {
  const { user } = useSessionUser();
  const [formData, setFormData] = useState<User>({
    phone: user?.phone || '',
    firstname: user?.firstname || '',
    middlename: user?.middlename || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    city: user?.city || '',
  });

  const token = localStorage.getItem('AuthToken');
  const { getSessionUser } = useSessionUser();

  useEffect(() => {
    if (getUserData) {
      setFormData(getUserData);
    } else {
      setFormData({
        phone: user?.phone || '',
        firstname: user?.firstname || '',
        middlename: user?.middlename || '',
        lastname: user?.lastname || '',
        email: user?.email || '',
        city: user?.city || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(
      token!,
      formData,
      (updatedUser) => {
        setFormData(updatedUser);
      },
      getSessionUser,
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form_profile">
      <div className="profile_forms">
        <h2>Профиль</h2>
        <div className="phone_number_container">
          <span className="phone_number_title">Номер телефона</span>
          <input
            className="input_profile1"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ backgroundColor: '#F3F4F6' }}
            disabled
            readOnly
          />
        </div>
        <div className="firstname_container">
          <span className="firstname_title">Имя</span>
          <input
            className="input_profile2"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="middlename_container">
          <span className="middlename_title">Отчество</span>
          <input
            className="input_profile3"
            type="text"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
          />
        </div>
        <div className="lastname_container">
          <span className="lastname_title">Фамилия</span>
          <input
            className="input_profile4"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="email_container">
          <span className="email_title">Почта</span>
          <input
            className="input_profile5"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="city_container">
          <span className="city_title">Город</span>
          <input
            className="input_profile6"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="save_profile">
          <span>Сохранить изменения</span>
          <span></span>
        </button>
      </div>
    </form>
  );
};

export default UserProfile;
