// src/components/Products/Products.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import { collabProducts, newArrivalProducts, categoriesInCollabs } from "../../data/products";

/* ---------- Single Product Card ---------- */
const CollabCard = ({ product, setIsLoading }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);
  const ref = useRef(null);
  const timerRef = useRef(null);

  const hasShopLinks = Boolean(product?.amazonLink || product?.etsyLink || product?.meeshoLink);
  const gallery = product.media?.length ? product.media : [{ type: "image", src: product.image }];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Open external links
  const openLink = async (platform) => {
    setLoading(true); setIsLoading?.(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      if (platform === "amazon" && product.amazonLink) window.open(product.amazonLink, "_blank", "noopener,noreferrer");
      else if (platform === "etsy" && product.etsyLink) window.open(product.etsyLink, "_blank", "noopener,noreferrer");
      else if (platform === "meesho" && product.meeshoLink) window.open(product.meeshoLink, "_blank", "noopener,noreferrer");
    } finally { setLoading(false); setIsLoading?.(false); setOpen(false); }
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Hover slideshow
  const startHover = () => {
    if (!gallery.length) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setHoverIndex((i) => (i + 1) % gallery.length), 1400);
  };
  const stopHover = () => { clearInterval(timerRef.current); setHoverIndex(0); };

  // Media renderer
  const renderThumbMedia = () => {
    const m = gallery[hoverIndex] || {};
    if (m.type === "video") return <video className="thumb-media" src={m.src} autoPlay muted loop playsInline />;
    if (m.type === "youtube") {
      const src = m.src.includes("/embed/") ? m.src : m.src.replace("watch?v=", "embed/").replace("shorts/", "embed/");
      return (
        <iframe
          className="thumb-media"
          src={src + "?autoplay=1&mute=1&controls=0&loop=1&playlist=" + (src.split("/embed/")[1] || "")}
          title="YouTube preview"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      );
    }
    return <img src={m.src || product.image} alt={m.alt || product.title} loading="lazy" />;
  };

  // Share (top-right icon)
  const handleShare = async (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/product/${product.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
      }
    } catch { /* ignore */ }
  };

  return (
    <div className={`collab-card ${open ? "is-open" : ""}`}>
      <Link to={`/product/${product.id}`} className="collab-thumb" onMouseEnter={startHover} onMouseLeave={stopHover}>
        {renderThumbMedia()}

        {/* Share icon */}
        <button className="share-btn" aria-label="Share" onClick={handleShare}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 0 6c.65 0 1.25-.21 1.74-.56l-7.1 3.55a3 3 0 1 0 0 2.03l7.1 3.55A3 3 0 1 0 18 16a2.99 2.99 0 0 0-1.74.56l-7.1-3.55A3 3 0 0 0 9 12c0-.39-.08-.76-.24-1.09l7.1-3.55C16.75 7.79 17.35 8 18 8Z"/>
          </svg>
        </button>

        {/* Title strip that slides into image on hover */}
        <div className="mover-title"><span className="mover-title-text">{product.title}</span></div>
      </Link>

      {/* Below image: fixed strip where SHOP NOW appears (price stays below) */}
      <div className="below-area">
        {hasShopLinks && (
          <div className="cta-row" ref={ref}>
            <button
              className={`collab-btn ${loading ? "is-loading" : ""}`}
              onClick={() => setOpen((v) => !v)}
            >
              {loading ? "OPENING..." : "SHOP NOW"}
            </button>
            {open && (
              <div className="shopmenu">
                {product.amazonLink && <button className="shopmenu-item amazon" onClick={() => openLink("amazon")}>Shop on Amazon</button>}
                {product.etsyLink && <button className="shopmenu-item etsy" onClick={() => openLink("etsy")}>Shop on Etsy</button>}
                {product.meeshoLink && <button className="shopmenu-item meesho" onClick={() => openLink("meesho")}>Shop on Meesho</button>}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Price/meta */}
      <div className="collab-meta">
        <div className="collab-price">
          <span className="price">₹ {product.price}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="mrp">₹ {product.originalPrice}</span>
              <span className="off">{discount}% off</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* --------------- Main Component ---------- */
const Products = ({ setIsLoading }) => {
  const [active, setActive] = useState("all");
  const [shown, setShown] = useState(collabProducts);

  const tabs = [
    { id: "all", label: "All Products" },
    ...categoriesInCollabs.map((c) => ({ id: c, label: c.replace("-", " ").replace(/\b\w/g, s => s.toUpperCase()) })),
  ];

  useEffect(() => {
    if (active === "all") setShown(collabProducts);
    else setShown(collabProducts.filter((p) => p.category === active));
  }, [active]);

  return (
    <section id="products" className="collabs">
      <div className="wrap">
        <h2 className="collabs-title">Collabs</h2>
        <p className="collabs-sub">Exclusive collaboration crochet kits in limited quantity – grab them before they wooble away!</p>

        <div className="collabs-tabs">
          {tabs.map((t) => (
            <button key={t.id} className={`collabs-tab ${active === t.id ? "is-active" : ""}`} onClick={() => setActive(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="collabs-grid">
          {shown.map((p) => (<CollabCard key={p.id} product={p} setIsLoading={setIsLoading} />))}
        </div>

        {newArrivalProducts.length > 0 && (
          <>
            <h3 className="new-arrivals-title">New Arrivals</h3>
            <div className="collabs-grid">
              {newArrivalProducts.map((p) => (<CollabCard key={p.id} product={p} setIsLoading={setIsLoading} />))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
export { Products as Collabs };
export { CollabCard };
