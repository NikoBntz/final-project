import { Router } from "express";
import rateLimit from "express-rate-limit";
import Message from "../model/Message.js";
import { validateContactInput } from "../utils/validation.js";

const router = Router();
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Demasiados mensajes. Intenta de nuevo más tarde." },
});

router.post("/", contactLimiter, async (req, res) => {
  const { data, error } = validateContactInput(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const savedMessage = await Message.create(data);

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
