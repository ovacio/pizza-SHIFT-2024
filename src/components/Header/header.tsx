import "./header.scss";
import { logoSite, logoProfile, logoBasket, logoExit } from "@/assets/index";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const header = () => {
  // Заглушка для дальнейшего изменения
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

  return (
  <nav className="header_navigation">
    <div className="header_left">
      <NavLink to="/">
        <img src={logoSite} alt="Site Logo" />
      </NavLink>
      <div className="header_profile">
        <NavLink to="/profile">
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
        <NavLink to="">
          <img src={logoExit} alt="Action" />
          <span>{isLoggedIn ? "Выйти" : "Войти"}</span>
        </NavLink>
      </div>
    </div>
  </nav>
  )
};

export default header;
