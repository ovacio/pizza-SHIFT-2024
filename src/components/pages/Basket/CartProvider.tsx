import { ReactNode, useEffect, useState } from 'react';

import { CartContext } from './cartContext';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else if (cart.length === 0) {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const updatePricePlus = (index: number) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, price: item.initialPrice + item.price } : item,
      ),
    );
  };

  const updatePriceMinus = (index: number) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? {
              ...item,
              price:
                item.price - item.initialPrice < item.initialPrice
                  ? item.price
                  : item.price - item.initialPrice,
            }
          : item,
      ),
    );
  };

  return (
    <CartContext.Provider value={{ cart, setCart, updatePricePlus, updatePriceMinus }}>
      {children}
    </CartContext.Provider>
  );
};
