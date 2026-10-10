import { useState } from "react";
import { submitContactMessage } from "../services/api";

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const contactDetails = [
  { label: "Instagram", value: "@levinorca" },
  { label: "Facebook", value: "Levinor Store" },
  { label: "WhatsApp", value: "+593 96 276 3508" },
  { label: "Ubicación", value: "Guayaquil, Ecuador" },
];

function Contact() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    if (status !== "idle") {
      setStatus("idle");
      setServerMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Escribe tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Ingresa un correo válido.";
    if (form.message.trim().length < 12) nextErrors.message = "Cuéntanos un poco más sobre tu proyecto.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setServerMessage("Revisa los campos marcados e intenta otra vez.");
      return;
    }

    try {
      setErrors({});
      setStatus("loading");
      setServerMessage("");

      await submitContactMessage({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });

      setStatus("success");
      setServerMessage("Gracias. Tu información ha sido enviada correctamente.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setServerMessage(error.message || "No se pudo enviar el mensaje.");
    }
  };

  return (
    <div className="page-shell contact-page">
      <section className="section-heading align-left">
        <span className="eyebrow">Contacto</span>
        <h1>Solicita tu proyecto o presupuesto.</h1>
      </section>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              <span>Nombre</span>
              <input type="text" name="name" value={form.name} onChange={handleChange} />
              {errors.name && <small>{errors.name}</small>}
            </label>
          </div>

          <div className="form-row">
            <label>
              <span>Correo</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} />
              {errors.email && <small>{errors.email}</small>}
            </label>
          </div>

          <div className="form-row">
            <label>
              <span>Teléfono</span>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
            </label>
          </div>

          <div className="form-row">
            <label>
              <span>Proyecto</span>
              <textarea name="message" rows="5" value={form.message} onChange={handleChange} />
              {errors.message && <small>{errors.message}</small>}
            </label>
          </div>

          <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Enviando..." : "Enviar mensaje"}
          </button>

          {serverMessage && (
            <p aria-live="polite" className={status === "success" ? "success-message" : "error-message"}>
              {serverMessage}
            </p>
          )}
        </form>

        <aside className="contact-sidebar">
          <h3>Contacto directo</h3>
          <ul className="contact-list">
            {contactDetails.map((item) => (
              <li key={item.label}>
                <strong>{item.label}:</strong> <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default Contact;
