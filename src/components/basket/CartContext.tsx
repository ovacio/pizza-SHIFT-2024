import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { CartItem } from "@/constants/interfaces";

interface CartContextProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updatePricePlus: (index: number) => void; 
  updatePriceMinus: (index: number) => void; 
}

interface CartProviderProps {
    children: ReactNode;
}


const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if(savedCart){
            setCart(JSON.parse(savedCart))
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0){
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        else if (cart.length === 0){
            localStorage.removeItem('cart');
        }
    }, [cart]);

    const updatePricePlus = (index: number) => {
        setCart(prevCart => 
            prevCart.map((item, i) => i === index ? {...item, price: item.initialPrice + item.price} : item)
        );
    };

    const updatePriceMinus = (index: number) => {
        setCart(prevCart => 
            prevCart.map((item, i) => i === index ? {...item, price: (item.price - item.initialPrice) < item.initialPrice ? item.price : (item.price - item.initialPrice)} : item)
        );
    };

    return (
        <CartContext.Provider value={{cart, setCart, updatePricePlus, updatePriceMinus}}>
            {children}
        </CartContext.Provider>
    )
}
 
export const useCart = () => {
    const context = useContext(CartContext);
    if(!context){
        throw new Error; 
    }
    return context;
}