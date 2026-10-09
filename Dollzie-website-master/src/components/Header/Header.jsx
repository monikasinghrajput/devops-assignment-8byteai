import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = ({ onScrollTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    const onResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setIsShopOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onEsc);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobileMenuOpen &&
        !e.target.closest(".mobile-nav") &&
        !e.target.closest(".mobile-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => onScrollTo?.(id), 300);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeShopModal = () => {
    setIsShopOpen(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          {/* Logo */}
          <div className="nav-brand">
            <Link to="/" onClick={handleHomeClick}>
              <img
                src="/image/Dollzie_Logo-03-02.png"
                alt="Dollzie Logo"
                className="logo"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const textLogo =
                    e.currentTarget.parentNode.querySelector(".logo-text");
                  if (textLogo) textLogo.style.display = "block";
                }}
              />
              <div className="logo-text" style={{ display: "none" }}>
                <h2>DOLLZIE</h2>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="navbar">
            <ul className="nav-links">
              <li>
                <a href="/" onClick={handleHomeClick}>
                  Home
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleNavClick(e, "products")}>
                  Products
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="actions">
            {/* Shopping */}
            <button
              className="icon-btn shopping-btn"
              aria-label="Open shopping options"
              onClick={() => setIsShopOpen(true)}
            >
              <i className="fas fa-bag-shopping"></i>
            </button>

            {/* Mobile Toggle */}
            <button
              className={`mobile-toggle ${isMobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <>
          <div
            className={`mobile-overlay ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
            {/* 🔻 Search removed from mobile menu */}
            <a href="/" onClick={handleHomeClick}>
              <i className="fas fa-home"></i> Home
            </a>
            <a href="#products" onClick={(e) => handleNavClick(e, "products")}>
              <i className="fas fa-box"></i> Products
            </a>
            <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
              <i className="fas fa-info-circle"></i> About Us
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
              <i className="fas fa-envelope"></i> Contact
            </a>
          </nav>
        </>
      )}

      {/* Shop Modal */}
      {isShopOpen && (
        <>
          <div className="shop-modal-overlay" onClick={closeShopModal} />
          <div
            className="shop-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shopTitle"
          >
            <button
              className="shop-close"
              onClick={closeShopModal}
              aria-label="Close shopping modal"
            >
              <i className="fas fa-times"></i>
            </button>

            <h3 id="shopTitle" className="shop-title">Shopping</h3>
            <p className="shop-desc">
              Discover our products on multiple platforms. Choose your preferred shopping destination and explore our exclusive collections.
            </p>

            <div className="shop-buttons">
              <a className="shop-btn amazon" href="https://amazon.in" target="_blank" rel="noopener noreferrer">
                <span className="shop-icon">a</span> Amazon
              </a>
              <a className="shop-btn etsy" href="https://etsy.com/shop" target="_blank" rel="noopener noreferrer">
                <span className="shop-icon">E</span> Etsy
              </a>
              <a className="shop-btn meesho" href="https://meesho.com" target="_blank" rel="noopener noreferrer">
                <span className="shop-icon">m</span> Meesho
              </a>
            </div>

            <div className="shop-follow">
              <span>Follow us on social media</span>
              <div className="shop-social">
                <a href="https://www.instagram.com/thedollzie" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/thedollzie" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.youtube.com/@thedollzie" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="https://www.linkedin.com/in/thedollzie" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.behance.net/thedollzie" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-behance"></i>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
