export default function ProductCard({ product }) {
  const category = product.category || "Muebles";
  const price = typeof product.price === "number"
    ? `Desde $${product.price.toLocaleString("es-EC")}`
    : product.price;

  return (
    <article className="product-card">
      <div className={`product-visual product-visual-${product.accent || "software"}`} aria-hidden="true">
        {category.slice(0, 2).toUpperCase()}
      </div>
      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{category}</span>
          <span className="product-price">{price}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <button type="button" className="btn btn-secondary btn-small">
          Request quote
        </button>
      </div>
    </article>
  );
}
