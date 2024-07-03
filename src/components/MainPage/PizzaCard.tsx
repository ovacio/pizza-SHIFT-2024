import '@/components/MainPage/mainPage.scss'
import { BaseApiUrl } from '@/constants/constants';
import { PizzaCardProps } from '@/constants/interfaces';


const PizzaCard = ({ pizza, openModal }: PizzaCardProps) => {
    return (
        <div key={pizza.id} className="pizza_container">
            <img src={`${BaseApiUrl}${pizza.img}`} alt={pizza.name} />
            <div className='pizza_card'>
              <div className="pizza_card_information">
                <h3>{pizza.name}</h3>
                <span>{pizza.description}</span>
              </div>
              <button
                className="animated-button"
                onClick={() => openModal(pizza.id)}
              >
                <span>Выбрать</span>
                <span></span>
              </button>
            </div>
          </div>
    )
}
export default PizzaCard;

