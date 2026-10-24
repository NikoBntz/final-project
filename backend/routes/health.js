import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", (_req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    ok: databaseConnected,
    status: databaseConnected ? "ok" : "degraded",
    database: mongoose.connection.readyState,
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

export default router;
