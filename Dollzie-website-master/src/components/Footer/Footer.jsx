// src/components/Footer/Footer.jsx
import React, { useState } from "react";
import "./Footer.css";

const Visa = (props) => (
  <svg viewBox="0 0 48 16" aria-hidden="true" {...props}>
    <rect width="48" height="16" rx="3" fill="#12268F" />
    <path
      fill="#fff"
      d="M17.7 11.9l1.3-7.8h2.1l-1.3 7.8h-2.1zm11.5-7.7c-.4-.1-.9-.2-1.4-.2-1.6 0-2.8.8-2.8 2 0 .9.8 1.4 1.5 1.7.7.3 1 .5 1 0 0-.5.4-1.1 1.5-1.1.5 0 1 .1 1.4.2l.3-1.6c-.2-.1-.9-.3-1.5-.3zm-5.4.1l-3.9 7.6h2.2l.5-1.1h2.7l.2 1.1h2l-1.8-7.6h-1.9zm-.8 4.9l1.7-3.3.4 3.3h-2.1zm-11.4-4.9l-2.7 7.8h2.2l2.7-7.8h-2.2zm-3.6 0L6 9.8 4.9 7.3c-.2-.6-.6-1.1-1.3-1.4-.5-.2-1-.4-1-.4l.1-.2H6c.4 0 .8.3.9.7l.8 2.1 1.3-3.9h2.1zM40.8 6c-.6-.3-1.6-.6-2.8-.6-1.6 0-2.7.7-2.7 1.7 0 .8.8 1.3 1.4 1.6.6.3.8.5.8.7 0 .4-.5.6-1 .6-.8 0-1.3-.1-1.9-.3l-.3 1.6c.5.2 1.3.3 2.1.3 1.9 0 3.2-.7 3.2-1.9 0-.6-.5-1.1-1.4-1.6-.6-.3-.9-.5-.9-.7 0-.2.3-.5.9-.5.8 0 1.3.2 1.7.3l.3-1.6z"
    />
  </svg>
);
const Mastercard = (props) => (
  <svg viewBox="0 0 48 16" aria-hidden="true" {...props}>
    <rect width="48" height="16" rx="3" fill="#fff" stroke="#ddd" />
    <circle cx="21" cy="8" r="5" fill="#EB001B" />
    <circle cx="27" cy="8" r="5" fill="#F79E1B" opacity=".9" />
  </svg>
);
const Amex = (props) => (
  <svg viewBox="0 0 48 16" aria-hidden="true" {...props}>
    <rect width="48" height="16" rx="3" fill="#2E77BC" />
    <text
      x="24"
      y="11"
      fill="#fff"
      fontSize="7"
      fontFamily="Arial,Helvetica,sans-serif"
      textAnchor="middle"
      fontWeight="700"
    >
      AMEX
    </text>
  </svg>
);
const PayPal = (props) => (
  <svg viewBox="0 0 48 16" aria-hidden="true" {...props}>
    <rect width="48" height="16" rx="3" fill="#fff" stroke="#ddd" />
    <text
      x="24"
      y="11"
      fill="#003087"
      fontSize="7"
      fontFamily="Arial,Helvetica,sans-serif"
      textAnchor="middle"
      fontWeight="700"
    >
      PayPal
    </text>
  </svg>
);
const ApplePay = (props) => (
  <svg viewBox="0 0 48 16" aria-hidden="true" {...props}>
    <rect width="48" height="16" rx="3" fill="#000" />
    <text
      x="24"
      y="11"
      fill="#fff"
      fontSize="7"
      fontFamily="Arial,Helvetica,sans-serif"
      textAnchor="middle"
      fontWeight="700"
    >
       Pay
    </text>
  </svg>
);
const GPay = (props) => (
  <svg viewBox="0 0 48 16" aria-hidden="true" {...props}>
    <rect width="48" height="16" rx="3" fill="#fff" stroke="#ddd" />
    <text
      x="24"
      y="11"
      fill="#1a73e8"
      fontSize="7"
      fontFamily="Arial,Helvetica,sans-serif"
      textAnchor="middle"
      fontWeight="700"
    >
      GPay
    </text>
  </svg>
);
const RuPay = (props) => (
  <svg viewBox="0 0 48 16" aria-hidden="true" {...props}>
    <rect width="48" height="16" rx="3" fill="#fff" stroke="#ddd" />
    <text
      x="24"
      y="11"
      fill="#172c6e"
      fontSize="7"
      fontFamily="Arial,Helvetica,sans-serif"
      textAnchor="middle"
      fontWeight="700"
    >
      RuPay
    </text>
  </svg>
);
const UPI = (props) => (
  <svg viewBox="0 0 48 16" aria-hidden="true" {...props}>
    <rect width="48" height="16" rx="3" fill="#fff" stroke="#ddd" />
    <text
      x="24"
      y="11"
      fill="#5f6368"
      fontSize="7"
      fontFamily="Arial,Helvetica,sans-serif"
      textAnchor="middle"
      fontWeight="700"
    >
      UPI
    </text>
  </svg>
);

const Footer = ({ onScrollTo }) => {
  // newsletter local state (works for both forms)
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  // NOTE: If you want to connect a real provider later (Mailchimp/Formspree),
  // put your endpoint here and POST the email to it.
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMsg("");
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValid) {
      setMsg("Please enter a valid email.");
      return;
    }

    try {
      setSubmitting(true);

      // --- Demo “working” flow: store locally & show success
      const list = JSON.parse(localStorage.getItem("dollzie_subs") || "[]");
      if (!list.includes(trimmed)) {
        list.push(trimmed);
        localStorage.setItem("dollzie_subs", JSON.stringify(list));
      }

      // --- Real API idea (uncomment & replace URL):
      // const res = await fetch("https://YOUR_ENDPOINT_HERE", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: trimmed }),
      // });
      // if (!res.ok) throw new Error("Subscribe failed");

      setMsg("Thanks for subscribing! 🎉");
      setEmail("");
    } catch (err) {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // helper to route when user clicks the hotspot on banner
  const goShop = (e) => {
    e.preventDefault();
    if (onScrollTo) onScrollTo("products");
    else window.location.href = "/#products";
  };

  return (
    <footer className="footer-root">
      {/* HERO BANNER */}
      <section
        className="footer-hero"
        style={{ backgroundImage: "url('/image/footerBanner.png')" }}
        aria-label="Ready for your next hobby?"
      >
        <a
          href="/#products"
          onClick={goShop}
          className="banner-hotspot"
          aria-label="Shop crochet kits"
          title="Shop crochet kits"
        />
      </section>

      {/* Newsletter strip */}
      <section className="footer-newsletter">
        <h4>Stay in the loop</h4>
        <p>Be the first to know about promotions, new products and sales.</p>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "SUBSCRIBING..." : "SUBSCRIBE"}
          </button>
        </form>
        {msg && <p className="newsletter-msg">{msg}</p>}
      </section>

      {/* Main footer columns */}
      <div className="footer-main container">
        <div className="footer-col">
          <h5>SHOP</h5>
          <ul>
            <li><a href="#shipping">Shipping</a></li>
            <li><a href="#returns">Returns</a></li>
            <li><a href="#stockists">Stockists</a></li>
            <li><a href="#workshops">Private workshops</a></li>
            <li><a href="#wholesale">Wholesale</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>ABOUT</h5>
          <ul>
            <li><a href="#our-story" onClick={() => onScrollTo?.("about")}>Our story</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#jobs">Jobs</a></li>
            <li><a href="#privacy">Privacy policy</a></li>
            <li><a href="#terms">Terms and conditions</a></li>
            <li><a href="#accessibility">Accessibility</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>HELP</h5>
          <ul>
            <li><a href="#kit-tutorials">Kit Tutorials</a></li>
            <li><a href="#other-tutorials">Other Tutorials</a></li>
            <li><a href="#office-hours">Office hours</a></li>
            <li><a href="#help-center">Help Center</a></li>
            <li><a href="#contact" onClick={() => onScrollTo?.("contact")}>Contact us</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>STAY IN THE LOOP</h5>
          <form className="newsletter-form is-compact" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              required
            />
            <button type="submit" disabled={submitting}>
              {submitting ? "SUBSCRIBING..." : "SUBSCRIBE"}
            </button>
          </form>

          {/* Social row */}
          <div className="footer-social">
            <a
              href="https://www.facebook.com/thedollzie"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="https://www.instagram.com/thedollzie"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="https://www.youtube.com/@thedollzie"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="YouTube"
            >
              <i className="fab fa-youtube" />
            </a>
            <a
              href="https://www.linkedin.com/in/thedollzie"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a
              href="https://www.behance.net/thedollzie"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance"
              title="Behance"
            >
              <i className="fab fa-behance" />
            </a>
          </div>
        </div>
      </div>

      {/* Payments row */}
      <div className="footer-payments-bar container" role="group" aria-label="Payment methods">
        <a className="pay" href="#" title="Visa"><Visa /></a>
        <a className="pay" href="#" title="Mastercard"><Mastercard /></a>
        <a className="pay" href="#" title="American Express"><Amex /></a>
        <a className="pay" href="#" title="PayPal"><PayPal /></a>
        <a className="pay" href="#" title="Apple Pay"><ApplePay /></a>
        <a className="pay" href="#" title="Google Pay"><GPay /></a>
        <a className="pay" href="#" title="RuPay"><RuPay /></a>
        <a className="pay" href="#" title="UPI"><UPI /></a>
      </div>

      {/* Bottom legal line */}
      <div className="footer-legal">
        <p>© {new Date().getFullYear()} Dollzie. All rights reserved.</p>
        <p className="footer-addr">01 Example Street, Bengaluru, KA 560001 • India</p>
      </div>
    </footer>
  );
};

export default Footer;
