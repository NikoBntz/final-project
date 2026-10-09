export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className={`product-visual product-visual-${product.accent}`} aria-hidden="true">
        {product.category.slice(0, 2).toUpperCase()}
      </div>
      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-price">{product.price}</span>
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
