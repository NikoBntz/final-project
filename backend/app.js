import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import healthcheckerRouter from "./routes/health.js";
import productsRouter from "./routes/products.js";
import contactRouter from "./routes/contact.js";
import adminRouter from "./routes/login.js";
import chatRouter from "./routes/chat.js";

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://nikobntz.github.io",
];

function getAllowedOrigins(frontendUrl = process.env.FRONTEND_URL) {
  return (frontendUrl || DEFAULT_ALLOWED_ORIGINS.join(","))
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function createApp({ frontendUrl } = {}) {
  const app = express();
  const allowedOrigins = getAllowedOrigins(frontendUrl);

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("Origin not allowed by CORS"));
      },
    }),
  );
  app.use(express.json({ limit: "100kb" }));

  app.get("/", (_req, res) => {
    res.json({ message: "Levinor API is running" });
  });

  app.use("/health", healthcheckerRouter);

  const requireDatabase = (_req, res, next) => {
    if (mongoose.connection.readyState === 1) {
      return next();
    }

    return res.status(503).json({
      message:
        "Database unavailable. Check the MongoDB Atlas network access settings.",
    });
  };

  app.use("/api/products", requireDatabase, productsRouter);
  app.use("/api/contact", requireDatabase, contactRouter);
  app.use("/api/admin", requireDatabase, adminRouter);
  app.use("/api/chat", requireDatabase, chatRouter);

  app.use((_req, res) => {
    res.status(404).json({ message: "Ruta no encontrada." });
  });

  app.use((error, _req, res, _next) => {
    if (error.status >= 400 && error.status < 500) {
      console.warn("Client request error:", error.message);
    } else {
      console.error("Unhandled request error:", error);
    }

    if (res.headersSent) return;

    const status =
      error.type === "entity.parse.failed"
        ? 400
        : error.status === 413
          ? 413
          : 500;
    res.status(status).json({
      message:
        status === 400
          ? "El cuerpo JSON no es válido."
          : status === 413
            ? "La solicitud es demasiado grande."
            : "Error interno del servidor.",
    });
  });

  return app;
}
