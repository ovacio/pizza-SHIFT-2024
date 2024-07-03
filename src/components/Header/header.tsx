import "./header.scss";
import { logoSite, logoProfile, logoBasket, logoExit } from "@/assets/index";
import { useAuth } from "@/constants/imports";
import { NavLink, useNavigate } from "react-router-dom";

const HeaderComponent = () => {

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleGet = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/')
  }

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
      <div className="header_userAction">
        <NavLink to={isLoggedIn ? '/profile' : '/login' } onClick={isLoggedIn ? () => {} : handleGet}>
          <img src={logoExit} alt="Action" />
          <span>{isLoggedIn ? "Выйти" : "Войти"}</span>
        </NavLink>
      </div>
    </div>
  </nav>
  )
};

export default HeaderComponent;
