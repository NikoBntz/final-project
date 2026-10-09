import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Admin from "../pages/Admin.jsx";
import Catalog from "../pages/Catalog.jsx";

function Header() {
  return (
    <>
      <HashRouter>
        <nav id="header">
          <p className="header">
            <Link to="/home">Home</Link>
          </p>
          <p className="header">
            <Link to="/about">About</Link>
          </p>
          <p className="header">
            <Link to="/contact">Contact</Link>
          </p>
          <p className="header">
            <Link to="/admin">Admin</Link>
          </p>
          <p className="header">
            <Link to="/catalog">Catalog</Link>
          </p>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default Header;
