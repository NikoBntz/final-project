import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";

function Catalog() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'Todos') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="page-shell catalog-page">
      <section className="section-heading align-left">
        <span className="eyebrow">Catálogo</span>
        <h1>Muebles y soluciones para cada ambiente</h1>
      </section>

      <div className="catalog-toolbar">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No hay productos en esta categoría aún.</h3>
          <p>Prueba con otra opción para seguir explorando el catálogo.</p>
        </div>
      )}
    </div>
  );
}

export default Catalog;
