import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";

/**
 * Hero: 6-slide auto carousel with dots + "SHOP NOW" hotspot.
 * - Auto-plays (4s). Pauses on hover or when page hidden.
 * - Dots clickable. Swipe (touch) supported.
 * - Each slide can have its own hotspot rect (percent-based).
 */
const SLIDES = [
  { src: "/image/Banners.png",  alt: "Banner 1", hotspot: { left: "10%", top: "66%", width: "20%", height: "18%" } },
  { src: "/image/Banners-1.png",alt: "Banner 2", hotspot: { left: "10%", top: "66%", width: "20%", height: "18%" } },
  { src: "/image/Banners-2.png",alt: "Banner 3", hotspot: { left: "10%", top: "66%", width: "20%", height: "18%" } },
  { src: "/image/Banners-3.png",alt: "Banner 4", hotspot: { left: "10%", top: "66%", width: "20%", height: "18%" } },
  { src: "/image/Banners-4.png",alt: "Banner 5", hotspot: { left: "10%", top: "66%", width: "20%", height: "18%" } },
  { src: "/image/Banners-5.png",alt: "Banner 6", hotspot: { left: "10%", top: "66%", width: "20%", height: "18%" } },
];

const AUTOPLAY_MS = 4000;

const Hero = ({ onScrollTo }) => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const timer = useRef(null);

  // autoplay
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIdx((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer.current);
  }, [paused]);

  // pause when tab hidden
  useEffect(() => {
    const handler = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  const goTo = (i) => setIdx(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) goTo(idx + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <section
      id="home"
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="hero-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {SLIDES.map((s, i) => (
          <div className="hero-slide" key={i}>
            <img src={s.src} alt={s.alt} className="hero-img" draggable="false" />
            {/* Invisible clickable hotspot placed over "SHOP NOW" area */}
            <button
              className="shop-now-hotspot"
              style={s.hotspot}
              aria-label="Shop Now"
              title="Shop Now"
              onClick={() => onScrollTo?.("categories")}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="hero-dots" role="tablist" aria-label="Hero slides">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === idx}
            className={`dot ${i === idx ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
