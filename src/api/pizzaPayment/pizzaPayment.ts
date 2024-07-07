import { DebitCard, InformationOrder, PostData } from '@/types/interfacesApi';
import { CartItem } from '@/types/interfacesPizza';
import { getCartData, getOrderData, getPaymentData } from '../localStorage';

const handleCheckout = async (
  orderData: InformationOrder,
  cartData: CartItem[],
  paymentData: DebitCard,
) => {
  const receiverAddress = orderData.receiverAddress
    ? {
        street: orderData.receiverAddress[0].street,
        house: orderData.receiverAddress[0].house,
        apartment: orderData.receiverAddress[0].apartment,
        comment: orderData.receiverAddress[0].comment || 'Ничего',
      }
    : {
        street: '',
        house: '',
        apartment: '',
        comment: 'Ничего',
      };

  const pizzas = cartData.map((item) => ({
    id: item.pizza.id.toString(),
    name: item.pizza.name,
    toppings: item.toppings.map((topping) => ({
      name: topping.name,
      cost: topping.cost,
      img: topping.img,
    })),
    description: item.pizza.description,
    size: {
      name: item.size,
      price: item.price,
    },
    doughs: {
      name: item.pizza.doughs[0].name,
      price: item.pizza.doughs[0].price,
    },
  }));

  const postData: PostData = {
    receiverAddress,
    person: {
      firstname: orderData.firstname,
      lastname: orderData.lastname,
      middlename: orderData.lastname,
      phone: orderData.phone,
    },
    debitCard: paymentData,
    pizzas,
  };

  return postData;
};

export const pizzaPayment = {
  getCartData,
  getPaymentData,
  getOrderData,
  handleCheckout,
};
