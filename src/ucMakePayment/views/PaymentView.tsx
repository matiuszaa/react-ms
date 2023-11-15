import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { finalizePayment } from "../logic/PaymentService";
import { PaymentMethod, PaymentStatus } from "../viewModels/PaymentViewModel";
import { InfinitySpin } from "react-loader-spinner";
import "./PaymentView.css";
import { Alert } from "react-bootstrap";

interface PaymentViewProps {}

const PaymentView: React.FC<PaymentViewProps> = () => {
  const { paymentId, paymentAmount } = useParams();
  const parsedPaymentAmount = paymentAmount ? parseInt(paymentAmount, 10) : 0;

  const [loading, setLoading] = useState<boolean>(false);
  const [paymentResponse, setPaymentResponse] = useState<{
    paymentStatus: PaymentStatus;
    redirectUrl: string;
  } | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>(PaymentMethod.CARD);

  const handlePay = async () => {
    try {
      setLoading(true);
      setPaymentResponse(null);

      // Hardcoded userId for simulation (replace with actual user authentication)
      const userId = "12345";

      const paymentDto = {
        paymentId: Number(paymentId),
        paymentMethod: selectedPaymentMethod,
        userId,
        paymentAmount: parsedPaymentAmount,
      };

      const response = await finalizePayment(paymentDto);

      setPaymentResponse(response);
    } catch (error) {
      console.error("Error while making payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <form className="payment-form">
        <div className="payment-info">
          <p>Payment ID: {paymentId}</p>
          <p>Payment Amount: {parsedPaymentAmount}</p>
        </div>
        <label className="payment-method-label">
          Payment Method:
          <select
            className="payment-method-select"
            value={selectedPaymentMethod}
            onChange={(e) =>
              setSelectedPaymentMethod(e.target.value as PaymentMethod)
            }
          >
            {Object.values(PaymentMethod).map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </label>
        <br />
        <div className="button-div">
          <button className="pay-button" onClick={handlePay} disabled={loading}>
            Pay
          </button>
        </div>
      </form>
      {loading && <InfinitySpin width="200" color="#8a1ff3" />}
      {paymentResponse && (
        <div className="response-div">
          {paymentResponse.paymentStatus === PaymentStatus.FAILURE ? (
            <Alert variant="danger" className="center-text">
              Payment Status: {paymentResponse.paymentStatus}
            </Alert>
          ) : (
            <Alert variant="success" className="center-text">
              Payment Status: {paymentResponse.paymentStatus}
            </Alert>
          )}
          <p>Redirect URL: {paymentResponse.redirectUrl}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentView;
