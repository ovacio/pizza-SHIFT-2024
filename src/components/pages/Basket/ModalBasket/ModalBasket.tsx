import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
// import { useState, useCallback, useEffect } from "react";
import cx from 'classnames';
import { CrossLogo } from '@/assets/index';
// import CardsGeneralApi from "@/api/CardsGeneralApi.tsx";
// import { translationIngredients } from "@/constants/translationList";
import modalStyle from './modalBasket.module.scss';
import './modalBasket.scss';
// import { BaseApiUrl } from "@/constants/constants";
// import { useCart } from "@/constants/imports";

export interface ModalBasket {
  isVisible: boolean;
  children?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  onClose: () => void;
}

const ModalWindowBasket = ({
  isVisible,
  children,
  className,
  overlayClassName,
  onClose,
}: ModalBasket) => {
  //   const [pizzaData, setPizzaData] = useState<Pizza[]>([]);
  //   const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  //   const [selectedSizePizza, setSelectedSizePizza] = useState<string | null>(
  //     null
  //   );
  //   const [selectedBasketPrice, setSelectedBasketPrice] = useState<number | 0>(0);
  //   const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  //   const [selectedToppingsBasket, setSelectedToppingsBasket] = useState<
  //     PizzaToppings[]
  //   >([]);
  //   const [selectedPizzaBasket, setSelectedPizzaBasket] = useState<
  //     [Pizza[], string]
  //   >([[], ""]);
  // Заглушка для дальнейшего использования под корзину
  //   const { cart, setCart } = useCart();

  //   const handleSizeClick = (size: string, sizeList: string, pizza: Pizza) => {
  //     setSelectedSizePizza(size);

  //     const selectedSize = selectedPizza?.sizes.find(
  //       (pizzaSize) => pizzaSize.name === sizeList
  //     );
  //     if (selectedSize) {
  //       setSelectedBasketPrice(selectedSize.price);
  //     }
  //     if (selectedPizzaBasket[0].length === 0 && selectedPizzaBasket[1] === "") {
  //       setSelectedPizzaBasket(([pizzas]) => [[...pizzas, pizza], sizeList]);
  //     } else {
  //       setSelectedPizzaBasket([[], ""]);
  //       setSelectedPizzaBasket(([pizzas]) => [[...pizzas, pizza], sizeList]);
  //     }
  //   };

  const handleCloseClick = () => {
    onClose();
    // setSelectedSizePizza(null);
    // setSelectedBasketPrice(0);
    // setSelectedToppings([]);
    // setSelectedToppingsBasket([]);
    // setSelectedPizzaBasket([[], ""]);
  };

  //   const handleDataLoaded = useCallback((data: Pizza[]) => {
  //     setPizzaData(data);
  //     setSelectedBasketPrice(0);
  //   }, []);

  //   useEffect(() => {
  //     if (selectedPizzaId !== null) {
  //       const pizza = pizzaData.find((pizza) => pizza.id === selectedPizzaId);
  //       setSelectedPizza(pizza || null);
  //     }
  //   }, [selectedPizzaId, pizzaData]);

  // ОШИБКА исправлена, при обновлении страницы происходил setItem по 'cart' на [], сделана проверка на cart.length > 0
  //   useEffect(() => {
  //     if (cart.length > 0) {
  //       localStorage.setItem("cart", JSON.stringify(cart));
  //     }
  //   }, [cart]);

  //   const handleChooseTopping = (
  //     cost: number,
  //     toppingName: string,
  //     topping: PizzaToppings
  //   ) => {
  //     const isToppingSelected = selectedToppings.some(
  //       (topping) => topping === toppingName
  //     );
  //     if (!isToppingSelected) {
  //       setSelectedToppings((prevToppings) => [...prevToppings, toppingName]);
  //       setSelectedBasketPrice((prevPrice) => prevPrice + cost);
  //       setSelectedToppingsBasket((prevToppings) => [...prevToppings, topping]);
  //     } else {
  //       setSelectedToppings((prevToppings) =>
  //         prevToppings.filter((item) => item !== toppingName)
  //       );
  //       setSelectedBasketPrice((prevPrice) => Math.max(prevPrice - cost, 0));
  //       setSelectedToppingsBasket((prevToppings) =>
  //         prevToppings.filter((t) => t.name !== topping.name)
  //       );
  //     }
  //   };

  // const addToCart = () => {
  //   // const newPizza = {
  //   //   pizza: selectedPizzaBasket[0][0],
  //   //   size: selectedPizzaBasket[1],
  //   //   toppings: selectedToppingsBasket,
  //   //   price: selectedBasketPrice,
  //   //   initialPrice: selectedBasketPrice,
  //   // };

  //   // console.log(newPizza)

  //   // setCart((prevCart = []) => [...prevCart, newPizza]);

  //   handleCloseClick();
  // };

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
                <div className="modal_container"></div>
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

export default ModalWindowBasket;
