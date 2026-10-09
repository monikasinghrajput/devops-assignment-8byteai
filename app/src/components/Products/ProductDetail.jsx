// src/components/Products/ProductDetail.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allProducts } from "../../data/products";
import "./ProductDetail.css";

/* reuse main grid so hover behavior identical */
import "../Products/Products.css";
import { CollabCard } from "../Products/Products";

const isYouTubeUrl = (url = "") => /youtube\.com|youtu\.be|shorts/i.test(url);
const getYouTubeId = (url = "") => {
  const m1 = url.match(/v=([^&]+)/); if (m1?.[1]) return m1[1];
  const m2 = url.match(/youtu\.be\/([^?]+)/); if (m2?.[1]) return m2[1];
  const m3 = url.match(/shorts\/([^?]+)/); if (m3?.[1]) return m3[1];
  return "";
};
const toYouTubeEmbed = (url = "") => {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : url;
};
const youTubeThumb = (url = "") => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : "";
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () => allProducts.find((p) => String(p.id) === String(id)),
    [id]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [openShopMenu, setOpenShopMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const shopRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setOpenShopMenu(false);
      }
    };
    if (openShopMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openShopMenu]);

  if (!product) {
    return (
      <section className="pdp">
        <div className="pdp-wrap">
          <button className="pdp-back" onClick={() => navigate(-1)}>← Back</button>
          <p>Product not found.</p>
        </div>
      </section>
    );
  }

  const discount =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const rawMedia = product.media?.length
    ? product.media
    : [{ type: "image", src: product.image, alt: product.title }];

  const media = rawMedia.map((m) => {
    if (m.type === "youtube" || isYouTubeUrl(m.src)) {
      return { ...m, type: "youtube", src: toYouTubeEmbed(m.src), thumb: youTubeThumb(m.src) };
    }
    return m;
  });

  const active = media[activeIndex];

  const related = (product.relatedIds || [])
    .map((rid) => allProducts.find((p) => p.id === rid))
    .filter(Boolean);

  const openLink = async (platform) => {
    const url =
      platform === "amazon"
        ? product.amazonLink
        : platform === "etsy"
        ? product.etsyLink
        : product.meeshoLink;
    if (!url) return;

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 300));
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setLoading(false);
      setOpenShopMenu(false);
    }
  };

  const hasAnyShop = Boolean(product?.amazonLink || product?.etsyLink || product?.meeshoLink);

  return (
    <section className="pdp">
      <div className="pdp-wrap">
        <button className="pdp-back" onClick={() => navigate(-1)}>← Back</button>

        <div className="pdp-grid">
          {/* ========== LEFT: Gallery + Description blocks ========== */}
          <div className="pdp-left">
            <div className="pdp-hero">
              {active.type === "youtube" ? (
                <iframe className="pdp-hero-media" src={active.src} title="YouTube video" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
              ) : active.type === "video" ? (
                <video key={active.src} controls playsInline className="pdp-hero-media">
                  <source src={active.src} type="video/mp4" />
                </video>
              ) : (
                <img className="pdp-hero-media" src={active.src} alt={active.alt || product.title} />
              )}
            </div>

            <div className="pdp-thumbs">
              {media.map((m, i) => (
                <button key={(m.src || "") + i} className={`pdp-thumb ${i === activeIndex ? "is-active" : ""}`} onClick={() => setActiveIndex(i)}>
                  {m.type === "youtube" ? (
                    <div className="pdp-thumb-video">
                      <img src={m.thumb || ""} alt="YouTube preview" />
                      <span className="pdp-play">▶</span>
                    </div>
                  ) : m.type === "video" ? (
                    <div className="pdp-thumb-video"><video muted><source src={m.src} type="video/mp4" /></video><span className="pdp-play">▶</span></div>
                  ) : (
                    <img src={m.src} alt={m.alt || ""} />
                  )}
                </button>
              ))}
            </div>

            {/* ---- Description, FAQ, What's included (Left detailed section stays as-is) ---- */}
            {product.descriptionTitle && (
              <div className="pdp-block"><h3>{product.descriptionTitle}</h3></div>
            )}
            {product.description && <p className="pdp-desc">{product.description}</p>}

            {product.faq?.length > 0 && (
              <div className="pdp-block">
                {product.faq.map((f, i) => (
                  <div key={i} className="pdp-faq">
                    <p><strong>{f.q}</strong></p>
                    <p>{f.a}</p>
                  </div>
                ))}
              </div>
            )}

            {product.included?.length > 0 && (
              <div className="pdp-block">
                {product.includedTitle && <h3>{product.includedTitle}</h3>}
                <ul className="included">
                  {product.included.map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </div>
            )}
          </div>

          {/* ========== RIGHT: Title + Short Description + Price + Shop Now ========== */}
          <div className="pdp-info">
            <h1 className="pdp-title">{product.title}</h1>

            {/* Brief block just under the title (exactly what you asked for) */}
            {(product.descriptionTitle || product.description || product.faq?.length) && (
              <div className="pdp-brief">
                {product.descriptionTitle && <h3>{product.descriptionTitle}</h3>}
                {product.description && <p>{product.description}</p>}
                {product.faq?.length > 0 && (
                  <div className="pdp-faq">
                    <p><strong>{product.faq[0].q}</strong></p>
                    <p>{product.faq[0].a}</p>
                  </div>
                )}
              </div>
            )}

            <div className="pdp-price">
              <span className="pdp-price-now">₹ {product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="pdp-price-mrp">₹ {product.originalPrice}</span>
                  <span className="pdp-price-off">{discount}% off</span>
                </>
              )}
            </div>

            {hasAnyShop && (
              <div className="pdp-cta" ref={shopRef}>
                <button className={`pdp-btn pdp-shopnow ${loading ? "is-loading" : ""}`} onClick={() => setOpenShopMenu((v) => !v)}>
                  {loading ? "OPENING..." : "SHOP NOW"}
                </button>
                {openShopMenu && (
                  <div className="pdp-shopmenu">
                    {product.amazonLink && <button className="pdp-shopmenu-item amazon" onClick={() => openLink("amazon")}>Shop on Amazon</button>}
                    {product.etsyLink && <button className="pdp-shopmenu-item etsy" onClick={() => openLink("etsy")}>Shop on Etsy</button>}
                    {product.meeshoLink && <button className="pdp-shopmenu-item meesho" onClick={() => openLink("meesho")}>Shop on Meesho</button>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related products – reuse CollabCard (hover identical to grid) */}
        {related.length > 0 && (
          <>
            <h3 className="pdp-related-title">You may also like</h3>
            <div className="collabs-grid" style={{ marginTop: 0 }}>
              {related.map((r) => (
                <CollabCard key={r.id} product={r} setIsLoading={() => {}} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
