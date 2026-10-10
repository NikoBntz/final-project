import { Link } from "react-router-dom";
import { products } from "../data/products";

const featuredSolutions = products.slice(0, 3);

const capabilities = [
  { number: "01", title: "Cocinas a medida", text: "Flujos de trabajo pensados alrededor de tus hábitos, con materiales honestos y almacenamiento que sí funciona." },
  { number: "02", title: "Closets y orden", text: "Sistemas empotrados que aprovechan cada centímetro sin perder ligereza, calma ni carácter." },
  { number: "03", title: "Piezas singulares", text: "Escritorios, anaqueles y muebles especiales hechos para resolver un espacio concreto." }
];

const metrics = [
  { value: "A medida", label: "Cada proyecto empieza en tu espacio" },
  { value: "Local", label: "Diseñado y fabricado en Guayaquil" },
  { value: "Directo", label: "Hablas con el equipo que lo construye" }
];

function Home() {
  return (
    <div className="page-shell home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Levinor / Taller de mobiliario</span>
          <h1>Lo que imaginas, <em>hecho preciso.</em></h1>
          <p>Diseñamos y fabricamos muebles a medida para que tu casa, oficina o negocio se sienta verdaderamente propio.</p>
          <div className="button-row">
            <Link to="/catalog" className="btn btn-primary">Explorar piezas <span aria-hidden="true">↗</span></Link>
            <Link to="/contact" className="text-link">Cuéntanos tu proyecto <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="hero-visual" aria-label="Composición geométrica de madera y planos de taller" role="img">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-slab hero-slab-back" aria-hidden="true" />
          <div className="hero-slab hero-slab-front" aria-hidden="true"><span>LEV / 24</span></div>
          <div className="hero-circle" aria-hidden="true" />
          <span className="hero-coordinate">-02° 10′ / -79° 54′</span>
          <span className="hero-caption">Materia / función / detalle</span>
        </div>
      </section>

      <section className="workshop-note" aria-label="Manifiesto de Levinor">
        <span className="section-index">01 — El taller</span>
        <p>Creemos que un mueble bien hecho no pide atención: <strong>la merece.</strong></p>
        <span className="workshop-mark" aria-hidden="true">✳</span>
      </section>

      <section className="feature-showcase">
        <div className="section-heading align-left"><span className="eyebrow">Lo que hacemos</span><h2>Diseño claro.<br /><em>Trabajo minucioso.</em></h2></div>
        <div className="feature-grid">
          {capabilities.map((item) => (
            <article className="feature-card" key={item.title}>
              <span className="feature-number">{item.number}</span><div className="feature-icon" aria-hidden="true">+</div>
              <h3>{item.title}</h3><p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-band">
        {metrics.map((metric, index) => (
          <div className="stat-item" key={metric.label}><span className="stat-index">0{index + 1}</span><strong>{metric.value}</strong><span>{metric.label}</span></div>
        ))}
      </section>

      <section className="featured-products">
        <div className="section-heading section-heading-split"><div><span className="eyebrow">Selección / 2024—25</span><h2>Piezas para<br /><em>vivir mejor.</em></h2></div><Link to="/catalog" className="text-link">Ver catálogo completo <span aria-hidden="true">↗</span></Link></div>
        <div className="mini-product-grid">
          {featuredSolutions.map((product, index) => (
            <article className={`mini-product mini-product-${index + 1}`} key={product.id}>
              <div className="product-ruler" aria-hidden="true"><span>0</span><span>50</span><span>100</span></div>
              <span className="mini-tag">{product.category} / 0{index + 1}</span><h3>{product.name}</h3><p>{product.description}</p><strong>{product.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta"><span className="section-index">02 — Empecemos</span><h2>Tu espacio tiene<br /><em>algo que decir.</em></h2><Link to="/contact" className="btn btn-secondary">Hablar con Levinor <span aria-hidden="true">↗</span></Link></section>
    </div>
  );
}

export default Home;
