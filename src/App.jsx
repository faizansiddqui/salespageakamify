import React from "react";
import { Routes, Route } from "react-router-dom";
import ServicePage from "./pages/ServicePage";
import Home from "./pages/Home";
import "./pages/ServicePage.css";
import "./components/ResponsiveUtils.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<ServicePage />} />
      </Routes>
    </>
  );
}

export default App;
