import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BasketEmpty, Cross2 } from "@/assets";
import { useAuth, useCart } from "@/constants/imports";
import { translationIngredients } from "@/constants/translationList";
import "./basket.scss";
import { BaseApiUrl } from "@/constants/constants";

const Basket = () => {
  const { cart, setCart, updatePricePlus, updatePriceMinus } = useCart();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [ costBasket, setCostBasket ] = useState<number>(0);
  const [countElement, setCountElement] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(cart);
    let cost = 0;
    cart.forEach((item) => {
      cost += item.price
    })
    setCostBasket(cost);  
  }, [cart]);

  useEffect(() => {

  }, [])
  
  const HandleClickInformationOrder = () => {
    console.log(localStorage.getItem('cart'));
    if(isLoggedIn){
      navigate('/information_order')
    }
    else{
      navigate('/login')
    }
  }

  const HandleMultiplierPlus = (index: number) => {
    updatePricePlus(index);
    setCountElement(countElement + 1);
  }

  const HandleMultiplierMinus = (index: number) => {
    updatePriceMinus(index);
    setCountElement(countElement - 1 > 0 ? countElement - 1 : 1);
  }
  
  const HandleRemoveItem = (index: number) => {
    setCart(prevState => prevState.filter((_, i) => i !== index));
  }

  return (
    <div className="basket_form">
      {cart.length <= 0 ? (
        <>
          <div className="basket_empty">
            <img src={BasketEmpty}></img>
            <h2>Ой, пусто!</h2>
            <span>
              Ваша корзина пуста, откройте «Меню» и выберите понравившийся
              товар. <br></br>Мы доставим ваш заказ!
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="basket_cards_form">
            <div className="basket_cards">
              {cart.map((item, index) => (
                <div key={index} className="pizza_list_basket">
                  <img src={`${BaseApiUrl}${item.pizza.img}`} className="pizza_img_basket"></img>
                  <h3>{item.pizza.name}</h3>
                  <span>
                    {item.size},{" "}
                    {item.size === "MEDIUM"
                      ? "30 см"
                      : item.size === "LARGE"
                      ? "35 см"
                      : "25 см"}
                    , традиционное тесто,{" "}
                    {item.toppings.map((topping) => translationIngredients[topping.name]).join(", ")}
                  </span>
                  <a>Изменить</a>
                  <div className="tab_plus_minus">
                    <button className="minus_element" onClick={() => HandleMultiplierMinus(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        className="icon"
                      >
                        <rect
                          width="10"
                          height="2"
                          y="4"
                          fill="#454B54"
                          rx="1"
                        ></rect>
                      </svg>
                    </button>
                    <div className="tab_number">{countElement}</div>
                    <button className="plus_element" onClick={() => HandleMultiplierPlus(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        className="icon"
                      >
                        <g fill="#454B54">
                          <rect width="2" height="10" x="4" ry="1"></rect>
                          <rect width="10" height="2" y="4" rx="1"></rect>
                        </g>
                      </svg>
                    </button>
                  </div>
                  <h3>{item.price} р</h3>
                  <img src={Cross2} className="remove_item" onClick={ () => HandleRemoveItem(index)}></img>
                </div>
              ))}
            </div>
            <div className="basket_footer">
              <div className="basket_cost">
                <h2>Стоимость заказа: </h2>
                <h2>{costBasket} р</h2>
              </div>
              <button className="checkout" onClick={HandleClickInformationOrder}>
                <span>Оформить заказ</span>
                <span></span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
