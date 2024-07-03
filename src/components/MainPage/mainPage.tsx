import "./mainPage.scss";
import { useState, useCallback } from "react";
import { Pizza } from "@/constants/interfaces";
import {
  CardsGeneralApi,
  ModalWindow,
  PizzaCard,
} from "@/constants/imports";

const MainPage= () => {
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
    <main>
      <div className="container_cards">
        <CardsGeneralApi onDataLoaded={handleDataLoaded} />
        {pizzaData.map((pizza) => (
          <PizzaCard pizza={pizza} openModal={openModal} key={pizza.id} />
        ))}
      </div>
      <ModalWindow
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        selectedPizzaId={selectedPizzaId}
      />
    </main>
  );
};

export default MainPage;
