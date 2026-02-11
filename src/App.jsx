import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ServicePage from "./pages/ServicePage";
import Home from "./pages/Home";
import BookEnrollment from "./pages/BookEnrollment";
import ViewDemo from "./pages/ViewDemo";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import PlanPaymentSuccess from "./pages/PlanPaymentSuccess";
import PlanPaymentFailed from "./pages/PlanPaymentFailed";
import Admin from "./pages/Admin";
import "./pages/ServicePage.css";
import "./components/ResponsiveUtils.css";
import OurTeam from "./components/our-team/ourTeam";
import TeamHero from "./components/our-team/ourTeam";
import LandingPage from "./components/our-team/ourTeam";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/book-enrollment" element={<BookEnrollment />} />
        <Route path="/view-demo" element={<ViewDemo />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/plan-payment-success" element={<PlanPaymentSuccess />} />
        <Route path="/plan-payment-failed" element={<PlanPaymentFailed />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/our-team" element={<LandingPage />} />
        
      </Routes>
    </>
  );
}

export default App;
