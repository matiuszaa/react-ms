/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  InitPaymentDto,
  InitPaymentResponse,
  PaymentDto,
  PaymentStatus,
} from "../viewModels/PaymentViewModel";

export const initPayment = async (
  initPaymentDto: InitPaymentDto
): Promise<InitPaymentResponse> => {
  // Mocked API call (replace with actual API call)
  const mockedResponse: InitPaymentResponse = {
    paymentId: 123,
    paymentAmount: 70,
  };

  console.log("taken initPaymentDto: ", initPaymentDto);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mocked API Response:", mockedResponse);
      resolve(mockedResponse);
    }, 1000);
  });
};

export const finalizePayment = async (
  paymentDto: PaymentDto
): Promise<{ paymentStatus: PaymentStatus; redirectUrl: string }> => {
  // Mocked API call (replace with actual API call)
  const mockedResponse: { paymentStatus: PaymentStatus; redirectUrl: string } =
    {
      paymentStatus: PaymentStatus.SUCCESS,
      redirectUrl: "https://example.com",
    };

  console.log("taken dto: ", paymentDto);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mocked API Response:", mockedResponse);
      resolve(mockedResponse);
    }, 3500);
  });
};
