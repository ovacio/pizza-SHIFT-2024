import { useState, useCallback, useEffect } from 'react';

import { Modal, PizzaCard } from '@/components/imports';
import { getPizzaCatalog } from '@/api/imports';

import './mainPage.scss';

const MainPage = () => {
  const [pizzaData, setPizzaData] = useState<Pizza[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);

  const openModal = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setIsVisible(true);
  };

  const handleDataLoaded = useCallback((data: Pizza[]) => {
    setPizzaData(data);
  }, []);

  useEffect(() => {
    getPizzaCatalog({ onDataLoaded: handleDataLoaded });
  }, [handleDataLoaded]);

  return (
    <main>
      <div className="container_cards">
        {pizzaData.map((pizza) => (
          <PizzaCard pizza={pizza} openModal={() => openModal(pizza)} key={pizza.id} />
        ))}
      </div>
      <Modal isVisible={isVisible} onClose={() => setIsVisible(false)} pizza={selectedPizza} />
    </main>
  );
};

export default MainPage;
