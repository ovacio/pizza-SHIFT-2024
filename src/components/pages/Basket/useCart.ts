import { useContext } from 'react';
import { CartContext } from './cartContext';

interface CartContextProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updatePricePlus: (index: number) => void;
  updatePriceMinus: (index: number) => void;
}

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
