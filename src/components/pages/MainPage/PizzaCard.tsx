import { API_URL } from '@/utils/constants';

import './mainPage.scss';

export interface PizzaCardProps {
  pizza: Pizza;
  openModal: () => void;
}

const PizzaCard = ({ pizza, openModal }: PizzaCardProps) => (
  <div key={pizza.id} className="pizza_container">
    <img src={`${API_URL}${pizza.img}`} alt={pizza.name} />
    <div className="pizza_card">
      <div className="pizza_card_information">
        <h3>{pizza.name}</h3>
        <span>{pizza.description}</span>
      </div>
      <div className="pizza_price">
        <h3>от {pizza.sizes[0].price} ₽</h3>
      </div>
      <button className="animated-button" onClick={() => openModal()}>
        <span>Выбрать</span>
        <span></span>
      </button>
    </div>
  </div>
);

export default PizzaCard;
