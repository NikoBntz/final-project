import { Link } from "react-router-dom";
import { products } from "../data/products";

const featuredSolutions = products.slice(0, 3);

const capabilities = [
  {
    title: 'Cocinas a medida',
    text: 'Soluciones integrales para kitchens funcionales, modernas y adaptadas a cada espacio.'
  },
  {
    title: 'Closets y almacenamiento',
    text: 'Armarios y sistemas organizadores diseñados para maximizar orden y comodidad.'
  },
  {
    title: 'Diseño práctico',
    text: 'Muebles para hogares, oficinas y proyectos personalizados con acabado pensado para durar.'
  }
];

const metrics = [
  { value: 'Guayaquil', label: 'Ubicación' },
  { value: 'Custom', label: 'Diseños a medida' },
  { value: 'WhatsApp', label: 'Contacto directo' }
];

function Home() {
  return (
    <div className="page-shell">
      <section className="hero-section">
        <span className="eyebrow">Levinor · Muebles y carpintería</span>
        <h1>Soluciones de mobiliario hechas para tu espacio.</h1>
        <p>
          En Levinor diseñamos y fabricamos soluciones de cocina, closets, anaqueles, oficinas y piezas decorativas
          con un enfoque práctico, moderno y totalmente personalizado.
        </p>
        <div className="button-row">
          <Link to="/catalog" className="btn btn-primary">Ver catálogo</Link>
          <Link to="/contact" className="btn btn-secondary">Solicitar presupuesto</Link>
        </div>
      </section>

      <section className="feature-showcase">
        <div className="section-heading">
          <span className="eyebrow">Especialidades</span>
          <h2>Soluciones para hogares y espacios de trabajo</h2>
        </div>

        <div className="feature-grid">
          {capabilities.map((item) => (
            <div className="feature-card" key={item.title}>
              <div className="feature-icon" aria-hidden="true">{item.title.slice(0, 1)}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-band">
        {metrics.map((metric) => (
          <div className="stat-item" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="featured-products">
        <div className="section-heading">
          <span className="eyebrow">Proyectos destacados</span>
          <h2>Trabajos con enfoque funcional y visual</h2>
        </div>

        <div className="mini-product-grid">
          {featuredSolutions.map((product) => (
            <div className="mini-product" key={product.id}>
              <span className="mini-tag">{product.category}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>{product.price}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
