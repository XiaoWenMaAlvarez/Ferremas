import { useEffect, useRef } from "react";
import './styles/PaypalButton.css'

const PaypalButton = ({ monto, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: monto,
            },
          }],
        });
      },
      onApprove: async (data, actions) => {
        const detalles = await actions.order.capture();
        onSuccess(detalles);
      },
      onError: (err) => {
        console.error("Error en el pago: ", err);
      },
    }).render(paypalRef.current);
  }, [monto, onSuccess]);

  return <div id="paypalButtons" ref={paypalRef}></div>;
};

export default PaypalButton;
