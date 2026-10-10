import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import healthcheckerRouter from "./routes/health.js";
import productsRouter from "./routes/products.js";
import contactRouter from "./routes/contact.js";
import adminRouter from "./routes/login.js";
import chatRouter from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Levinor API is running" });
});

app.use("/health", healthcheckerRouter);
app.use("/api/products", productsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

startServer();
