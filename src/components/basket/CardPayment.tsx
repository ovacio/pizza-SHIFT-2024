import "./cardPayment.scss";
import { DebitCard } from "@/constants/interfaces";
import { useState, useEffect } from "react";
import { useOrderForm } from "@/constants/imports";

const CardPaymentInfo = () => {
    const [isFullOrder, setIsFullOrder] = useState<boolean>(false);
    const { cartData, paymentData, orderData, isLoading, handleCheckout } = useOrderForm();

    const [formData, setFormData] = useState<DebitCard>({
        pan: "",
        expireDate: "",
        cvv: "",
    })

    const isNumberCardValid = formData.pan.length === 9 && /^\d{4}\s\d{4}$/.test(formData.pan);
    const isDateCardValid = formData.expireDate.length === 5 && /^\d{2}\/\d{2}$/.test(formData.expireDate);
    const isCVVCardValid = formData.cvv.length === 3 && /^\d{3}$/.test(formData.cvv);

    const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const HandleSavePayment = () => {
        const paymentInfo = {... formData};
        localStorage.setItem('information_payment', JSON.stringify(paymentInfo));

        console.log(isLoading)
        if (orderData && !isLoading) {
            handleCheckout(orderData, cartData, paymentData);
          } else {
            console.error("Ошибка: данные заказа не загружены");
          }
        
        //console.log(localStorage.getItem('information_payment'))
    }

    useEffect(() => {
        const fielder = formData.pan !== '' && formData.expireDate !== '' && formData.cvv !== '';
        const fielderValid = isNumberCardValid && isDateCardValid && isCVVCardValid;

        setIsFullOrder(fielder && fielderValid);

      }, [formData])
    

  return (
    <>
      <div className="form_payment">
        <div className="payment_container">
          <h2>Введите данные карты для оплаты</h2>
          <div className="payment_box">
            <div className="payment_info">
              <div className="container_card_number">
                <span className="card_number_title">Номер*</span>
                <input
                  className="card_number"
                  type="text"
                  name="pan"
                  value={formData.pan}
                  style={{borderColor: !isNumberCardValid && formData.pan !== "" ? 'red' : '#dcdcdc'}}
                  placeholder="0000 0000"
                  onChange={HandleChange}
                />
              </div>
              <div className="container_twoRow_card">
                <div className="container_card_date">
                  <span className="date_card_title">Срок*</span>
                  <input
                    className="card_date"
                    type="text"
                    name="expireDate"
                    value={formData.expireDate}
                    style={{borderColor: !isDateCardValid && formData.expireDate !== "" ? 'red' : '#dcdcdc'}}
                    placeholder="00/00"
                    onChange={HandleChange}
                  />
                </div>
                <div className="container_card_cvc">
                  <span className="cvc_card_title">CVV*</span>
                  <input
                    className="card_cvc"
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    style={{borderColor: !isCVVCardValid && formData.cvv !== "" ? 'red' : '#dcdcdc'}}
                    placeholder="000"
                    onChange={HandleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <button type='submit' className="checkout_button" disabled={!isFullOrder} onClick={HandleSavePayment}>
            <span>Оплатить</span>
            <span></span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CardPaymentInfo;
