import React from "react";

function ProductCard({ title, img }) {
  return (
    <div className="product-card">
      <img src={img} alt={title} srcset="" className="product-img" />
      <span className="product-title">{title}</span>
    </div>
  );
}

export default ProductCard;
