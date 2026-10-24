import { useState } from "react";
import { useLocation } from "react-router-dom";
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
  const { state } = useLocation();
  const [form, setForm] = useState(() => ({
    ...initialState,
    message: state?.productName ? `Me interesa: ${state.productName}. ` : "",
  }));
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
              <span id="name-label">Nombre</span>
              <input id="name" type="text" name="name" value={form.name} onChange={handleChange} required autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
              {errors.name && <small id="name-error" role="alert">{errors.name}</small>}
            </label>
          </div>

          <div className="form-row">
            <label>
              <span id="email-label">Correo</span>
              <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
              {errors.email && <small id="email-error" role="alert">{errors.email}</small>}
            </label>
          </div>

          <div className="form-row">
            <label>
              <span id="phone-label">Teléfono</span>
              <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange} autoComplete="tel" />
            </label>
          </div>

          <div className="form-row">
            <label>
              <span id="message-label">Proyecto</span>
              <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
              {errors.message && <small id="message-error" role="alert">{errors.message}</small>}
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
