import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from "./globals/appLayout/AppLayout.tsx";
import PaymentStartView from "./ucMakePayment/views/PaymentStartView.tsx";
import PaymentView from "./ucMakePayment/views/PaymentView.tsx";
import CreateEventPage from "./ucCreateEvent/views/CreateEventPage.tsx";

function App() {
  return (
    <>
      <AppLayout />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home PAGE</div>} />
          <Route path="/events" element={<div>EVENTS PAGE</div>} />
          <Route path="/start-payment" element={<PaymentStartView />} />
          <Route path="/payment" element={<PaymentView />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route
            path="/payment/:paymentId/:paymentAmount"
            element={<PaymentView />}
          />
          <Route path="*" element={<div>PAGE NOT FOUND</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
