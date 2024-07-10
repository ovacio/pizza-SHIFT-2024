import React, { createContext } from 'react';

interface CartContextProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updatePricePlus: (index: number) => void;
  updatePriceMinus: (index: number) => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => {},
  updatePricePlus: () => {},
  updatePriceMinus: () => {},
});
