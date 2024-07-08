import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import cx from 'classnames';

import { CrossLogo, accept } from '@/assets/index';
import { useCart } from '@/components/imports';
import { getOrderData } from '@/api/localStorage';
import { translationIngredients } from '@/constants/translationList';

import modalStyle from './modalBasket.module.scss';
import './modalBasket.scss';

export interface ModalBasket {
  isVisible: boolean;
  children?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  onClose: () => void;
}

const ModalWindowBasket = ({
  isVisible,
  children,
  className,
  overlayClassName,
  onClose,
}: ModalBasket) => {
  const { cart, setCart } = useCart();
  const order = getOrderData();
  const navigate = useNavigate();

  const handleCloseClick = () => {
    onClose();
  };

  const handleClickMainPage = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setCart([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('information_order');
    localStorage.removeItem('information_payment');
    navigate('/');
  }

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cx(modalStyle.overlay, overlayClassName)}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2 },
          }}
        >
          <motion.div className={modalStyle.modalPosition}>
            <motion.div className={modalStyle.modalContainer}>
              <div
                className={cx(modalStyle.modal, className)}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="modal_container_cross">
                  <img className="cross_logo" src={CrossLogo} onClick={handleCloseClick}></img>
                </div>
                <img className="accept_logo" src={accept} />
                <h2>Оплата прошла успешно!</h2>
                <div className="modal_information_order">
                  <div className="order">
                    <span className="title">Заказ</span>
                    {cart.map((item, index) => (
                      <div key={index} className="order_list_pizza">
                        <span>
                          {item.pizza.name}, {item.size}{' '}
                          {item.size === 'MEDIUM'
                            ? '30 см'
                            : item.size === 'LARGE'
                              ? '35 см'
                              : '25 см'}
                          , традиционное тесто,{' '}
                          {item.toppings
                            .map((topping) => translationIngredients[topping.name])
                            .join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="delivery_address">
                    <span className="title">Адрес доставки</span>
                    <div className="delivery_info">
                      <span>{order.address}</span>
                    </div>
                  </div>
                  <div className="order_quantity">
                    <span className="title">Сумма заказа</span>
                    <div className="quantity_info">
                      {cart.map((item) => (
                        <span>{item.price} р</span>
                      ))}
                    </div>
                  </div>
                  <span className='sms_duplicate'>Вся информация была продублирована в SMS</span>
                </div>
                <a className='to_mainPage' onClick={handleClickMainPage}>Перейти в главное меню</a>
                {children}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ModalWindowBasket;
