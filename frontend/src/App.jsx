import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";
import Catalog from "./pages/Catalog.jsx";
import Assistant from "./pages/Assistant.jsx";

function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <Header />
        <button
          type="button"
          className="skip-link"
          onClick={() => document.getElementById("main-content")?.focus()}
        >
          Saltar al contenido
        </button>
        <main id="main-content" className="main-content" tabIndex="-1">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/catalog" element={<Catalog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
