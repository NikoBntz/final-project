import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="footer-brand">Levinor</div>
          <p>Diseño, fabricación y carpintería para hogares, oficinas y espacios personalizados.</p>
        </div>

        <div className="footer-col">
          <h5>Explorar</h5>
          <ul className="footer-links">
            <li><Link to="/home">Inicio</Link></li>
            <li><Link to="/catalog">Catálogo</Link></li>
            <li><Link to="/about">Nosotros</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Contacto</h5>
          <ul className="footer-links">
            <li><a href="https://wa.me/593962763508" target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a href="https://www.instagram.com/levinorca/" target="_blank" rel="noreferrer">Instagram @levinorca</a></li>
            <li><span>Guayaquil, Ecuador</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Levinor | Muebles a medida</p>
      </div>
    </footer>
  );
}
