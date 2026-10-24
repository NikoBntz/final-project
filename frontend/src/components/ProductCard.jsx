import { WHATSAPP_CATALOG_URL } from "../constants/links";

export default function ProductCard({ product }) {
  const category = product.category || "Muebles";
  const price =
    typeof product.price === "number"
      ? `$${product.price.toLocaleString("es-EC")}`
      : product.price;

  return (
    <article className="product-card">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-visual"
        />
      ) : (
        <div
          className={`product-visual product-visual-${product.accent || "software"}`}
          aria-hidden="true"
        >
          {category.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{category}</span>
          <span className="product-price">{price}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <a
          href={WHATSAPP_CATALOG_URL}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary btn-small"
          aria-label={`Comprar ${product.name}`}
        >
          Comprar ahora
        </a>
      </div>
    </article>
  );
}
