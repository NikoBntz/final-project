import React from "react";

const Catalog = () => {
  return (
    <div className="catalog-container">
      <header>
        <h1>Our Catalog</h1>
      </header>
      <main>
        <section className="catalog-items">
          <h2>Explore Our Products</h2>
          <div className="product-grid">{/* Product cards will go here */}</div>
        </section>
      </main>
    </div>
  );
};

export default Catalog;
