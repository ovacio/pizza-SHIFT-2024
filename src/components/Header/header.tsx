import './header.scss'
import logoSite from "../../assets/logo.svg";
import logoProfile from "../../assets/User.svg";
import logoBasket from "../../assets/lets-icons_basket-alt-3-light.svg";
import logoExit from "../../assets/Exit.svg";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="header_navigation">
        <div className="header_left">
          <NavLink to=''>
            <img src={logoSite} alt="Site Logo" />
          </NavLink>
          <div className="header_profile">
          <NavLink to=''>
              <img src={logoProfile} alt="Profile" />
              <span>Профиль</span>
            </NavLink>
          </div>
        </div>
        <div className="header_right">
          <div className="header_basket">
            <NavLink to=''> 
              <img src={logoBasket} alt="Basket" />
              <span>Корзина</span>
            </NavLink>
          </div>
          <div className="header_userLogin">
            <NavLink to=''>
              <img src={logoExit} alt="Enter" />
              <span>Войти</span>
            </NavLink>
          </div>
          <div className="header_userExit" style={{display: 'none'}}>
            <NavLink to=''>
              <img src={logoExit} alt="Exit" />
              <span>Выйти</span>
            </NavLink>
          </div>
        </div>
      </nav>
    )
}

export default Header;