import axios from "axios";
import { useState, useEffect } from "react";
import { DebitCard, InformationOrder, PostData, CartItem } from "@/constants/interfaces";

export const useOrderForm = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [paymentData, setPaymentData] = useState<DebitCard | null>(null);
  const [orderData, setOrderData] = useState<InformationOrder | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const cart = localStorage.getItem("cart");
      const payment = localStorage.getItem("information_payment");
      const order = localStorage.getItem("information_order");

      if (cart) {
        setCartData(JSON.parse(cart));
      }

      if (payment) {
        setPaymentData(JSON.parse(payment));
      }

      if (order) {
        setOrderData(JSON.parse(order));
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleCheckout = async (
    orderData: InformationOrder | null,
    cartData: CartItem[] | [],
    paymentData: DebitCard | null
  ) => {
    if (!orderData || !paymentData || !cartData) {
      console.error("Ошибка: данные не загружены из localStorage");
      return;
    }

    const receiverAddress = {
        street: "",
        house: "",
        apartment: "",
        comment: "",
      };
      if (orderData.receiverAddress) {
        const addressParts = orderData.receiverAddress;
        receiverAddress.street = addressParts[0].street;
        receiverAddress.house = addressParts[0].house;
        receiverAddress.apartment = addressParts[0].apartment;
        receiverAddress.comment = addressParts[0].comment;
      }

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
      }
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

    try {
      const response = await axios.post(
        "https://shift-backend.onrender.com/pizza/payment",
        postData
      );
      console.log(response);
    } catch (error) {
        console.log(postData);
      console.error("Ошибка:", error);
    }
  };

  return { cartData, paymentData, orderData, isLoading, handleCheckout };
};
