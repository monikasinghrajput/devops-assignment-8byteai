import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import ProductDetail from "./components/Products/ProductDetail"; // 
import Footer from "./components/Footer/Footer";

import Notification from "./components/common/Notification/Notification";
import LoadingSpinner from "./components/common/LoadingSpinner/LoadingSpinner";

import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
  };
  const removeNotification = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header onScrollTo={scrollToSection} showNotification={showNotification} />

        <main>
          <Routes>
            {/* Home (hero + products grid) */}
            <Route
              path="/"
              element={
                <>
                  <Hero onScrollTo={scrollToSection} />
                  <Products
                    showNotification={showNotification}
                    setIsLoading={setIsLoading}
                  />
                </>
              }
            />
            {/* Product Detail Page */}
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>

        <Footer onScrollTo={scrollToSection} />

        <div className="notification-container">
          {notifications.map((n) => (
            <Notification
              key={n.id}
              message={n.message}
              type={n.type}
              onClose={() => removeNotification(n.id)}
            />
          ))}
        </div>

        {isLoading && <LoadingSpinner />}
      </div>
    </BrowserRouter>
  );
}

export default App;
