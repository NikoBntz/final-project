import { Router } from "express";
import rateLimit from "express-rate-limit";
import Message from "../model/Message.js";

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Demasiados mensajes. Intenta de nuevo más tarde." },
});

router.post("/", contactLimiter, async (req, res) => {
  const { name, email, phone = "", message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Nombre, correo y mensaje son obligatorios." });
  }

  const cleanedName = String(name).trim();
  const cleanedEmail = String(email).trim();
  const cleanedMessage = String(message).trim();

  if (cleanedName.length < 2) {
    return res.status(400).json({ message: "Escribe un nombre válido." });
  }

  if (!emailPattern.test(cleanedEmail)) {
    return res.status(400).json({ message: "Ingresa un correo válido." });
  }

  if (cleanedMessage.length < 12) {
    return res.status(400).json({ message: "Cuéntanos un poco más sobre tu proyecto." });
  }

  try {
    const savedMessage = await Message.create({
      name: cleanedName,
      email: cleanedEmail.toLowerCase(),
      phone: String(phone || "").trim(),
      message: cleanedMessage,
    });

    return res.status(201).json({
      success: true,
      message: "Tu mensaje fue enviado correctamente.",
      data: { id: savedMessage._id },
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({ message: "No se pudo enviar el mensaje. Intenta de nuevo." });
  }
});

export default router;
