import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import cx from 'classnames';

import { CrossLogo } from '@/assets/index';
import { getPizzaCatalog } from '@/api/imports';
import { translationIngredients, translationSizesPizza } from '@/constants/translationList';
import { API_URL } from '@/constants/constants';
import { useCart } from '@/components/imports';

import modalStyle from './modal.module.scss';
import './modal.scss';

export interface Modal {
  isVisible: boolean;
  children?: React.ReactNode;
  pizza: Pizza | null;
  className?: string;
  overlayClassName?: string;
  onClose: () => void;
}

const Modal = ({ isVisible, children, pizza, className, overlayClassName, onClose }: Modal) => {
  const [pizzaData, setPizzaData] = useState<Pizza[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [selectedSizePizza, setSelectedSizePizza] = useState<string | null>(null);
  const [selectedBasketPrice, setSelectedBasketPrice] = useState<number | 0>(0);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedToppingsBasket, setSelectedToppingsBasket] = useState<PizzaToppings[]>([]);
  const [selectedPizzaBasket, setSelectedPizzaBasket] = useState<[Pizza[], string]>([[], '']);
  // Заглушка для дальнейшего использования под корзину
  const { cart, setCart } = useCart();

  const handleSizeClick = (sizeList: string, pizza: Pizza) => {
    setSelectedSizePizza(translationSizesPizza[sizeList]);

    const selectedSize = selectedPizza?.sizes.find((pizzaSize) => pizzaSize.name === sizeList);
    if (selectedSize) {
      setSelectedBasketPrice(selectedSize.price);
    }
    if (selectedPizzaBasket[0].length === 0 && selectedPizzaBasket[1] === '') {
      setSelectedPizzaBasket(([pizzas]) => [[...pizzas, pizza], sizeList]);
    } else {
      setSelectedPizzaBasket([[], '']);
      setSelectedPizzaBasket(([pizzas]) => [[...pizzas, pizza], sizeList]);
    }
  };

  const handleCloseClick = () => {
    onClose();
    setSelectedSizePizza(null);
    setSelectedBasketPrice(0);
    setSelectedToppings([]);
    setSelectedToppingsBasket([]);
    setSelectedPizzaBasket([[], '']);
  };

  const handleDataLoaded = useCallback((data: Pizza[]) => {
    setPizzaData(data);
    setSelectedBasketPrice(0);
  }, []);

  useEffect(() => {
    if (pizza !== null) {
      setSelectedPizza(pizza);
    }
  }, [pizza, pizzaData]);

  useEffect(() => {
    getPizzaCatalog({ onDataLoaded: handleDataLoaded });
  }, [handleDataLoaded]);

  // ОШИБКА исправлена, при обновлении страницы происходил setItem по 'cart' на [], сделана проверка на cart.length > 0
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const handleChooseTopping = (cost: number, toppingName: string, topping: PizzaToppings) => {
    const isToppingSelected = selectedToppings.some((topping) => topping === toppingName);
    if (!isToppingSelected) {
      setSelectedToppings((prevToppings) => [...prevToppings, toppingName]);
      setSelectedBasketPrice((prevPrice) => prevPrice + cost);
      setSelectedToppingsBasket((prevToppings) => [...prevToppings, topping]);
    } else {
      setSelectedToppings((prevToppings) => prevToppings.filter((item) => item !== toppingName));
      setSelectedBasketPrice((prevPrice) => Math.max(prevPrice - cost, 0));
      setSelectedToppingsBasket((prevToppings) =>
        prevToppings.filter((t) => t.name !== topping.name),
      );
    }
  };

  const addToCart = () => {
    const newPizza = {
      pizza: selectedPizzaBasket[0][0],
      size: selectedPizzaBasket[1],
      toppings: selectedToppingsBasket,
      price: selectedBasketPrice,
      initialPrice: selectedBasketPrice,
    };

    setCart((prevCart = []) => [...prevCart, newPizza]);

    handleCloseClick();
  };

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cx(modalStyle.overlay, overlayClassName)}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2 },
          }}
        >
          <motion.div className={modalStyle.modalPosition}>
            <motion.div className={modalStyle.modalContainer}>
              <div
                className={cx(modalStyle.modal, className)}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="modal_container_cross">
                  <img className="cross_logo" src={CrossLogo} onClick={handleCloseClick}></img>
                </div>
                <div className="modal_container">
                  {selectedPizza ? (
                    <>
                      <div className="modal_container_logoPizza">
                        <img src={`${API_URL}${selectedPizza.img}`} alt={selectedPizza.name} />
                      </div>
                      <div className="modal_container_ingredients">
                        <div className="modal_container_ingredients2">
                          <div className="modal_container_title">
                            <h2>{selectedPizza.name}</h2>
                            <span className="desciption_hidden">
                              {selectedSizePizza ? `${selectedSizePizza}, Традиционное тесто.` : ''}
                            </span>
                            <span className="desription">{selectedPizza.description}</span>
                          </div>
                          <div className="tabs_wrap">
                            <ul>
                              <li
                                button-tabs="true"
                                onClick={() => handleSizeClick('SMALL', selectedPizza)}
                              >
                                Маленькая
                              </li>
                              <li
                                button-tabs="true"
                                onClick={() => handleSizeClick('MEDIUM', selectedPizza)}
                              >
                                Средняя
                              </li>
                              <li
                                button-tabs="true"
                                onClick={() => handleSizeClick('LARGE', selectedPizza)}
                              >
                                Большая
                              </li>
                            </ul>
                          </div>
                          <span className="add_ingredient_span">Добавить по вкусу</span>
                          <div className="add_ingredient_buttons">
                            {selectedPizza.toppings.map((topping: PizzaToppings, index) => (
                              <button
                                key={index}
                                className="button_add_ingredient"
                                onClick={() =>
                                  handleChooseTopping(topping.cost, topping.name, topping)
                                }
                              >
                                <img src={`${API_URL}${topping.img}`} />
                                <div className="topping_name">
                                  <span>
                                    {translationIngredients[topping.name]}
                                  </span>
                                </div>
                                <div className="topping_cost">
                                  <span>{topping.cost} ₽</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="modal_container_footer">
                          <button className="buy_basket" onClick={() => addToCart()}>
                            В корзину за {selectedBasketPrice} ₽
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>Загрузка...</p>
                  )}
                </div>
                {children}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
