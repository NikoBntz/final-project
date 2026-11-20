import { Link } from "react-router-dom";
import { WHATSAPP_CATALOG_URL } from "../constants/links";
import heroImg from "../assets/hero-img.jpg";

const capabilities = [
  {
    number: "01",
    title: "Cocinas a medida",
    text: "Diseñamos las mismas en base a tus gustos, priorizando la optimización del espacio, y la funcionalidad.",
  },
  {
    number: "02",
    title: "Closets",
    text: "Sistemas empotrados que aprovechan tus espacios.",
  },
  {
    number: "03",
    title: "Piezas singulares",
    text: "Escritorios, anaqueles y muebles especiales hechos para resolver un problema, dentro de un espacio concreto.",
  },
];

const metrics = [
  { value: "A medida", label: "Cada proyecto empieza en tu espacio" },
  { value: "Local", label: "Diseñado y fabricado en Guayaquil" },
  { value: "Directo", label: "Fácil y rápida comunicación" },
];

function Home() {
  return (
    <div className="page-shell home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Levinor / Taller de mobiliario</span>
          <h1>
            Fabricamos a la medida <em>de tus sueños.</em>
          </h1>
          <p>
            Diseñamos y fabricamos muebles a medida para que tu casa, oficina o
            negocio se sienta verdaderamente propio.
          </p>
          <div className="button-row">
            <a
              href={WHATSAPP_CATALOG_URL}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Explorar piezas <span aria-hidden="true">↗</span>
            </a>
            <Link to="/contact" className="text-link">
              Cuéntanos tu proyecto <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src={heroImg}
            alt="Cocina azul forrada en formica, diseñada y fabricada por Levinor"
            className="hero-image"
          />
        </div>
      </section>

      <section className="workshop-note" aria-label="Manifiesto de Levinor">
        <span className="section-index">01 — El taller</span>
        <p>
          Creemos que un mueble bien hecho no pide atención:{" "}
          <strong>la merece.</strong>
        </p>
        <span className="workshop-mark" aria-hidden="true">
          ✳
        </span>
      </section>

      <section className="feature-showcase">
        <div className="section-heading align-left">
          <span className="eyebrow">Lo que hacemos</span>
          <h2>
            Diseño claro.
            <br />
            <em>Trabajo minucioso.</em>
          </h2>
        </div>
        <div className="feature-grid">
          {capabilities.map((item) => (
            <article className="feature-card" key={item.title}>
              <span className="feature-number">{item.number}</span>
              <div className="feature-icon" aria-hidden="true">
                +
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-band">
        {metrics.map((metric, index) => (
          <div className="stat-item" key={metric.label}>
            <span className="stat-index">0{index + 1}</span>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="home-cta">
        <span className="section-index">02 — Empecemos</span>
        <h2>
          Tu espacio tiene
          <br />
          <em>algo que decir.</em>
        </h2>
        <Link to="/contact" className="btn btn-secondary">
          Hablar con Levinor <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}

export default Home;
