import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './infoOrder.scss';

const InfoOrder = () => {
  const navigate = useNavigate();
  const [, setIsLoadingInfo] = useState<boolean>(true);
  const [isFullInfo, setIsFullInfo] = useState<boolean>(false);

  const [formData, setFormData] = useState<InformationOrder>({
    phone: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    receiverAddress: [
      {
        street: '',
        house: '',
        apartment: '',
        comment: '',
      },
    ],
  });

  useEffect(() => {
    const fetchUser = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setFormData((prevState) => ({
          ...prevState,
          phone: user?.phone || '',
        }));
      }
      setIsLoadingInfo(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const isAllFieldsFilled =
      formData.phone !== '' &&
      formData.firstname !== '' &&
      formData.lastname !== '' &&
      formData.email !== '' &&
      formData.address !== '';

    setIsFullInfo(isAllFieldsFilled);
  }, [formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addressParts = formData.address.split(',').map((part) => part.trim());
    const receiverAddress: RecipientAddress = {
      street: addressParts[0] || '',
      house: addressParts[1] || '',
      apartment: addressParts[2] || '',
      comment: addressParts[3] || 'Ничего',
    };
    const { ...otherFormData } = formData;

    const newOrder = {
      ...otherFormData,
      receiverAddress: [receiverAddress],
    };

    localStorage.setItem('information_order', JSON.stringify(newOrder));

    navigate('/payment_info');
  };

  const HandleClickPreview = () => {
    navigate('/basket');
  };

  return (
    <form onSubmit={handleSubmit} className="form_profile">
      <div className="info_order_forms">
        <h2>Введите ваши данные</h2>
        <div className="phone_number_container">
          <span className="phone_number_title">Номер телефона*</span>
          <input
            className="input_profile1"
            type="text"
            name="phone"
            value={formData.phone}
            style={{ backgroundColor: '#F3F4F6' }}
            onChange={handleChange}
          />
        </div>
        <div className="firstname_container">
          <span className="firstname_title">Имя*</span>
          <input
            className="input_profile2"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="lastname_container">
          <span className="lastname_title">Фамилия*</span>
          <input
            className="input_profile4"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="email_container">
          <span className="email_title">Почта*</span>
          <input
            className="input_profile5"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="address_container">
          <span className="address_title">Адрес*</span>
          <input
            className="input_profile6"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="information_order_buttons">
          <button type="submit" className="save_info" onClick={HandleClickPreview}>
            <span>Назад</span>
            <span></span>
          </button>
          <button type="submit" className="save_info" disabled={!isFullInfo}>
            <span>Продолжить</span>
            <span></span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default InfoOrder;
