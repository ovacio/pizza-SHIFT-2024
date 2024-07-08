export const getCartData = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const getPaymentData = (): DebitCard => {
  const payment = localStorage.getItem('information_payment');
  return payment ? JSON.parse(payment) : null;
};

export const getOrderData = (): InformationOrder => {
  const order = localStorage.getItem('information_order');
  return order ? JSON.parse(order) : null;
};

export const getUserData = (): User => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const putUserData = (order: User) => {
  localStorage.setItem('user', JSON.stringify(order));
}
