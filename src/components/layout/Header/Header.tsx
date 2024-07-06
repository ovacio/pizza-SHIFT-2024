import { NavLink, useNavigate } from 'react-router-dom';

import { logoSite, logoProfile, logoBasket, logoExit } from '@/assets/index';
import { useAuth } from '@/components/imports';

import './header.scss';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleGet = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="header_navigation">
      <div className="header_left">
        <NavLink to="/">
          <img src={logoSite} alt="Site Logo" />
        </NavLink>
        <div className="header_profile">
          <NavLink to={isLoggedIn ? '/profile' : '/login'}>
            <img src={logoProfile} alt="Profile" />
            <span>Профиль</span>
          </NavLink>
        </div>
      </div>
      <div className="header_right">
        <div className="header_basket">
          <NavLink to="/basket">
            <img src={logoBasket} alt="Basket" />
            <span>Корзина</span>
          </NavLink>
        </div>
        {!isLoggedIn ? (
          <div className="header_userLogin">
            <NavLink to="/login" style={{ display: isLoggedIn ? 'none' : 'flex' }}>
              <img src={logoExit} alt="Enter" />
              <span>Войти</span>
            </NavLink>
          </div>
        ) : (
          <div className="header_userExit" style={{ display: isLoggedIn ? 'flex' : 'none' }}>
            <NavLink to="/" onClick={handleGet}>
              <img src={logoExit} alt="Exit" />
              <span>Выйти</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
