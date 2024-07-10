import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { accept, CrossLogo } from '@/assets/index';
import { useCart } from '@/components/imports';
import { translationIngredients, translationSizesPizza } from '@/utils/translationList';

import './modalBasket.scss';
import modalStyle from './modalBasket.module.scss';

export interface ModalBasket {
  isVisible: boolean;
  children?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  isDataPayment?: PostData;
  isSuccessPayment: boolean;
  onClose: () => void;
}

const ModalWindowBasket = ({
  isVisible,
  children,
  className,
  overlayClassName,
  isDataPayment,
  isSuccessPayment,
  onClose,
}: ModalBasket) => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const addressArray = [
    isDataPayment?.receiverAddress.street,
    isDataPayment?.receiverAddress.house,
    isDataPayment?.receiverAddress.apartment,
    isDataPayment?.receiverAddress.comment,
  ];

  const handleCloseClick = () => {
    onClose();
    clearStorage();
    navigate('/');
  };

  const handleClickMainPage = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    clearStorage();
    navigate('/');
  };

  const clearStorage = () => {
    setCart([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('information_order');
    localStorage.removeItem('information_payment');
  };

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
              {isSuccessPayment ? (
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
                      {isDataPayment?.pizzas.map((item, index) => (
                        <div key={index} className="order_list_pizza">
                          <span>
                            {item.name}, {translationSizesPizza[item.size.name]}, традиционное тесто
                            {item.toppings.length > 0 ? ' + ' : ''}
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
                        <span>{addressArray.join(', ')}</span>
                      </div>
                    </div>
                    <div className="order_quantity">
                      <span className="title">Сумма заказа</span>
                      <div className="quantity_info">
                        {cart.map((item, index) => (
                          <span key={index}>{item.price} р</span>
                        ))}
                      </div>
                    </div>
                    <span className="sms_duplicate">Вся информация была продублирована в SMS</span>
                  </div>
                  <a className="to_mainPage" onClick={handleClickMainPage}>
                    Перейти в главное меню
                  </a>
                  {children}
                </div>
              ) : (
                <p>Загрузка...</p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ModalWindowBasket;
