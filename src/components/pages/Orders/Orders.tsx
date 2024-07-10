import { useEffect, useState } from 'react';

import { getPizzaOrders } from '@/api/imports';
import { orderCancelled, orderDelivered, orderPending } from '@/assets/index';
import { translationStatusDelivery } from '@/utils/translationList';

import './orders.scss';

const Orders = () => {
  const [orderInformation, setOrderInformation] = useState<OrdersResponse>();

  useEffect(() => {
    const token = localStorage.getItem('AuthToken');

    const getOrders = async () => {
      if (token) {
        setOrderInformation(await getPizzaOrders(token));
      }
    };
    getOrders();
    console.log(orderInformation);
  }, []);

  const imageOrderDelivered = (status: number) => {
    if (status === 0 || status === 1 || status === 2) {
      return orderPending;
    } else if (status === 3) {
      return orderDelivered;
    } else {
      return orderCancelled;
    }
  };

  return (
    <>
      <div className="container_orders">
        <div className="title_orders">
          <span>Статус</span>
          <span>Адрес доставки</span>
          <span>Состав заказа</span>
        </div>
        {orderInformation?.orders.map((item, index) => {
          const addressParts = [
            item.receiverAddress.street,
            item.receiverAddress.house,
            item.receiverAddress.apartment,
            item.receiverAddress.comment,
          ];
          return (
            <div key={index} className="order_card">
              <div className="order_status">
                <img src={imageOrderDelivered(item.status)} />
                <span>{translationStatusDelivery[item.status]}</span>
              </div>
              <div className="order_address">
                <span>{addressParts.join(', ')}</span>
              </div>
              <div className="order_composition">
                <span>Ветчина и сыр</span>
              </div>
              <div className="order_info">
                <span>Подробнее</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Orders;
