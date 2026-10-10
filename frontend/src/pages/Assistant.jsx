import { useMemo, useState } from "react";
import { sendChatMessage } from "../services/api";

const initialMessages = [
  {
    role: "assistant",
    content: "Hola. Soy el asistente de Levinor. Consulta por piezas a medida, catálogo o cotización.",
  },
];

function Assistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useMemo(
    () => messages.slice(-8).map((message) => ({ role: message.role, content: message.content })),
    [messages],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) {
      return;
    }

    const userMessage = { role: "user", content: trimmedInput };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setErrorMessage("");
    setIsLoading(true);

    try {
      const data = await sendChatMessage({
        message: trimmedInput,
        history,
      });

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply || "Puedo ayudarte con Levinor. Contacta con el equipo para una cotización.",
        },
      ]);
    } catch (error) {
      setErrorMessage(error.message || "No se pudo enviar el mensaje.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-shell assistant-page">
      <section className="assistant-header">
        <span className="eyebrow">Levinor / asistente</span>
        <h1>Pregúntale al equipo.</h1>
        <p>Consulta por piezas, estilos, materiales o un proyecto a medida.</p>
      </section>

      <div className="assistant-shell">
        <div className="assistant-thread" aria-live="polite">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`assistant-bubble ${message.role === "user" ? "user" : "assistant"}`}
            >
              {message.content}
            </div>
          ))}

          {isLoading && <div className="assistant-bubble assistant typing">Pensando...</div>}
        </div>

        <form className="assistant-form" onSubmit={handleSubmit}>
          <textarea
            rows="4"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="¿Necesitas una pieza para un espacio concreto?"
            aria-label="Mensaje para el asistente de Levinor"
          />

          <div className="assistant-actions">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Assistant;
