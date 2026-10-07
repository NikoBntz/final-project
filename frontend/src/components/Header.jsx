import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Admin from "../pages/Admin.jsx";

function Header() {
  return (
    <>
      <HashRouter>
        <nav id="header">
          <p class="header">
            <Link to="/home">Home</Link>
          </p>
          <p class="header">
            <Link to="/about">About</Link>
          </p>
          <p class="header">
            <Link to="/contact">Contact</Link>
          </p>
          <p class="header">
            <Link to="/admin">Admin</Link>
          </p>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default Header;
