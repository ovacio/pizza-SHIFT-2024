import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postOtpsCode, useSessionUser, postSignIn } from '@/api/imports';
import { useAuth } from '@/components/imports';

import './login.scss';

interface LoginProps {
  onClose: () => void;
}

const Login = ({ onClose }: LoginProps) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCodeVisible, setCodeVisible] = useState(false);
  const { sessionUser } = useSessionUser();
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Проверка на валидацию номера телефона
  const isPhoneValid = phone.length === 11 && /[7-8]+\d{10}/.test(phone);
  // Проверка на валидацию кода подтверждения
  const isCodeValid = code.length === 6 && /\d+/.test(phone);

  const HandleDisplayEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setCodeVisible(true);
    postOtpsCode(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await postSignIn(phone, parseInt(code, 10));

      if (response.success) {
        localStorage.setItem('AuthToken', response.token);
        sessionUser(response.token);
        setIsLoggedIn(true);
        onClose();
        navigate('/');
      }
  };

  return (
    <form className="form_autorization" onSubmit={handleSubmit}>
      <div className="autorization">
        <div>Введите номер телефона для входа в личный кабинет</div>
        <div className="autorization_label">
          <div>
            <input
              type="text"
              className="phone_number"
              style={{
                borderColor: !isPhoneValid && phone !== '' ? 'red' : '#CED2DA',
              }}
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div id="div_phone_code" style={{ display: isCodeVisible ? 'block' : 'none' }}>
            <input
              type="text"
              className="phone_code"
              style={{
                borderColor: !isCodeValid && code !== '' ? 'red' : '#CED2DA',
              }}
              placeholder="Код подтверждения"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
        <div className="autorization_button_information">
          <button
            className="autorization_button"
            onClick={HandleDisplayEdit}
            style={{ display: !isCodeVisible ? 'block' : 'none' }}
            disabled={!isPhoneValid}
          >
            Продолжить
          </button>
          <button
            className="autorization_button"
            type="submit"
            style={{ display: isCodeVisible ? 'block' : 'none' }}
            disabled={!isCodeValid}
          >
            Войти
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
