import React from "react";
import { useLocation, Link } from "react-router-dom";

// Example products (replace with your real data or API)
const products = [
  { id: 1, title: "Woolen Keychain", price: 150, image: "/image/keychain.jpg" },
  { id: 2, title: "Handmade Hair Bow", price: 120, image: "/image/hairbow.jpg" },
  { id: 3, title: "Custom Sticker", price: 50, image: "/image/sticker.jpg" },
  { id: 4, title: "Kids Book Cover", price: 300, image: "/image/bookcover.jpg" },
];

const useQuery = () => new URLSearchParams(useLocation().search);

export default function SearchPage() {
  const q = useQuery().get("q")?.trim() || "";
  const results = q
    ? products.filter((p) =>
        p.title.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  return (
    <div style={{ paddingTop: 90, maxWidth: 1100, margin: "0 auto", paddingInline: 16 }}>
      <h2>Search results for: “{q}”</h2>
      {results.length === 0 ? (
        <p>No products found. <Link to="/">Go back</Link></p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
          gap: 16
        }}>
          {results.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              style={{
                textDecoration: "none",
                color: "#111",
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 10
                }}
              />
              <div style={{ marginTop: 8, fontWeight: 700 }}>{p.title}</div>
              <div style={{ color: "#666" }}>₹{p.price}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
