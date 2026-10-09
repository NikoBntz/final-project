const values = [
  'Muebles personalizados',
  'Diseño para cada espacio',
  'Soluciones funcionales y prácticas',
  'Atención directa por WhatsApp'
];

function About() {
  return (
    <div className="page-shell about-page">
      <section className="section-heading align-left">
        <span className="eyebrow">Nosotros</span>
        <h1>Levinor: diseño, fabricación y carpintería a medida.</h1>
      </section>

      <div className="about-layout">
        <article className="info-panel">
          <p>
            Levinor es una marca de mobiliario y carpintería en Guayaquil, Ecuador, enfocada en soluciones
            personalizadas para hogares, oficinas y espacios interiores. Su identidad pública combina diseño,
            fabricación y producción de muebles a medida para necesidades prácticas y estéticas.
          </p>
          <p>
            A través de su portafolio, la marca muestra piezas para cocinas, closets, anaqueles, escritorios,
            almacenamiento y muebles decorativos. La propuesta se centra en crear soluciones funcionales que
            respondan a las dimensiones y estilo de cada ambiente.
          </p>
        </article>

        <aside className="info-panel accent-panel">
          <h3>Lo que representa Levinor</h3>
          <ul className="value-list">
            {values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </aside>
      </div>

      <section className="stats-band compact-stats">
        <div className="stat-item">
          <strong>5</strong>
          <span>categorías principales</span>
        </div>
        <div className="stat-item">
          <strong>Cocinas</strong>
          <span>Closets · Anaqueles · Oficina</span>
        </div>
        <div className="stat-item">
          <strong>Personalizado</strong>
          <span>Diseño a la medida</span>
        </div>
      </section>
    </div>
  );
}

export default About;
