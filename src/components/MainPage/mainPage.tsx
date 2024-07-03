import "./mainPage.scss";
import { useState, useCallback } from "react";
import { Pizza } from "@/constants/Interfaces";
import { CardsGeneralApi, ModalComponent  } from '@/constants/Imports';

const MainPageComponent = () => {
  const [pizzaData, setPizzaData] = useState<Pizza[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPizzaId, setSelectedPizzaId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setSelectedPizzaId(id);
    setIsVisible(true);
  };

  const handleDataLoaded = useCallback((data: Pizza[]) => {
    setPizzaData(data);
  }, []);

  return (
    <>
      <div className="container_cards">
        <CardsGeneralApi onDataLoaded={handleDataLoaded} />
        {pizzaData.map((pizza) => (
          <div key={pizza.id} className="pizza_container">
            <img src={pizza.img} alt={pizza.name} />
            <div className={`pizza_card${pizza.id}`}>
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
        ))}
      </div>
      <ModalComponent 
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        selectedPizzaId={selectedPizzaId}
      ></ModalComponent >
    </>
  );
};

export default MainPageComponent;
