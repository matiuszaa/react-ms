import React from "react";
import { useNavigate } from "react-router-dom";
import { initPayment } from "../logic/PaymentService";
import { InitPaymentDto } from "../viewModels/PaymentViewModel";
import "./PaymentStartView.css";

interface PaymentStartViewProps {}

const PaymentStartView: React.FC<PaymentStartViewProps> = () => {
  const navigate = useNavigate();

  const handleInitPayment = async () => {
    try {
      const initPaymentDto: InitPaymentDto = { eventId: "your_event_id" }; // Replace with actual eventId
      const response = await initPayment(initPaymentDto);
      navigate(`/payment/${response.paymentId}/${response.paymentAmount}`);
    } catch (error) {
      console.error("Error starting payment:", error);
    }
  };

  return (
    <div className="init-payment-div">
      <button className="start-payment-button" onClick={handleInitPayment}>
        Start Payment
      </button>
    </div>
  );
};

export default PaymentStartView;
