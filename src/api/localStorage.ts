import { CartItem } from '@/types/interfacesPizza';
import { DebitCard, InformationOrder } from '@/types/interfacesApi';

export const getCartData = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const getPaymentData = (): DebitCard | null => {
  const payment = localStorage.getItem('information_payment');
  return payment ? JSON.parse(payment) : null;
};

export const getOrderData = (): InformationOrder | null => {
  const order = localStorage.getItem('information_order');
  return order ? JSON.parse(order) : null;
};
