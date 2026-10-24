import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { WHATSAPP_CATALOG_URL } from "../constants/links";
import { useProducts } from "../hooks/useProducts";

function Catalog() {
  const { products, status, error, retry } = useProducts();
  const [activeCategory, setActiveCategory] = useState('Todos');

  const handleRetry = () => {
    retry();
  };

  const categories = useMemo(
    () => ['Todos', ...new Set(products.map((product) => product.category))],
    [products],
  );

  const visibleProducts = useMemo(() => {
    if (!categories.includes(activeCategory) || activeCategory === 'Todos') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, categories, products]);

  const selectedCategory = categories.includes(activeCategory) ? activeCategory : "Todos";

  return (
    <div className="page-shell catalog-page">
      <section className="section-heading align-left">
        <span className="eyebrow">Catálogo</span>
        <h1>Muebles y soluciones para cada ambiente</h1>
      </section>

      {status === 'success' && products.length > 0 && (
        <div className="catalog-toolbar">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={selectedCategory === category}
              className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {status === 'loading' && (
        <div className="empty-state" role="status">
          <h3>Cargando catálogo...</h3>
          <p>Estamos trayendo los muebles disponibles.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="empty-state" role="alert">
          <h3>No pudimos cargar el catálogo.</h3>
          <p>{error} Verifica que el backend esté encendido e inténtalo de nuevo.</p>
          <button type="button" className="btn btn-secondary" onClick={handleRetry}>
            Reintentar
          </button>
        </div>
      )}

      {status === 'success' && visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      ) : status === 'success' && (
        <div className="empty-state">
          {products.length === 0 ? (
            <>
              <h3>El catálogo está vacío por ahora.</h3>
              <p>Vuelve pronto para conocer nuestras piezas disponibles.</p>
            </>
          ) : (
            <>
              <h3>No hay productos en esta categoría aún.</h3>
              <p>Prueba con otra opción para seguir explorando el catálogo.</p>
            </>
          )}
          <a className="text-link empty-state-link" href={WHATSAPP_CATALOG_URL} target="_blank" rel="noreferrer">
            Ver catálogo de WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default Catalog;
