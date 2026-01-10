import React from "react";
import { Routes, Route } from "react-router-dom";
import ServicePage from "./pages/ServicePage";
import Home from "./pages/Home";
import BookEnrollment from "./pages/BookEnrollment";
import ViewDemo from "./pages/ViewDemo";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Admin from "./pages/Admin";
import "./pages/ServicePage.css";
import "./components/ResponsiveUtils.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/book-enrollment" element={<BookEnrollment />} />
        <Route path="/view-demo" element={<ViewDemo />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
