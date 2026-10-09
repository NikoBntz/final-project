import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-logo">
          <NavLink to="/home" className="logo-text">Levinor</NavLink>
          <span className="logo-tagline">Muebles a medida</span>
        </div>

        <nav className="nav-menu" aria-label="Navegación principal">
          <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Inicio
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Nosotros
          </NavLink>
          <NavLink to="/catalog" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Catálogo
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Contacto
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => `nav-link admin-nav-btn ${isActive ? "active" : ""}`}>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
