import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Router } from "express";
import Admin from "../model/Admin.js";
import Product from "../model/Product.js";
import Message from "../model/Message.js";
import { validateProductInput } from "../utils/validation.js";

const router = Router();
const JWT_SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "production" ? null : "levinor-dev-secret");
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Demasiados intentos. Intenta de nuevo más tarde." },
});

function isValidProductId(id) {
  return mongoose.isValidObjectId(id);
}

function authenticateToken(req, res, next) {
  if (!JWT_SECRET) {
    return res.status(503).json({ message: "La autenticación no está configurada." });
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Token requerido." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
}

router.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "Usuario y contraseña son obligatorios." });
  }

  if (!JWT_SECRET) {
    return res.status(503).json({ message: "La autenticación no está configurada." });
  }

  try {
    const admin = await Admin.findOne({ username: String(username).trim().toLowerCase() });

    if (!admin) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const isValid = await bcrypt.compare(String(password), admin.passwordHash);

    if (!isValid) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const token = jwt.sign(
      { sub: admin._id.toString(), username: admin.username, name: admin.name },
      JWT_SECRET,
      { expiresIn: "8h" },
    );

    return res.json({
      token,
      user: { username: admin.username, name: admin.name },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "No se pudo iniciar sesión." });
  }
});

router.get("/me", authenticateToken, async (req, res) => {
  if (!mongoose.isValidObjectId(req.user.sub)) {
    return res.status(401).json({ message: "Token inválido." });
  }

  try {
    const admin = await Admin.findById(req.user.sub).select("-passwordHash");
    return res.json({ user: admin });
  } catch (error) {
    return res.status(500).json({ message: "No se pudo cargar el usuario." });
  }
});

router.get("/dashboard", authenticateToken, async (_req, res) => {
  try {
    const [productCount, messageCount, products, messages] = await Promise.all([
      Product.countDocuments(),
      Message.countDocuments(),
      Product.find().sort({ createdAt: -1 }).limit(5),
      Message.find().sort({ createdAt: -1 }).limit(5),
    ]);

    return res.json({
      stats: {
        productCount,
        messageCount,
        openLeads: messageCount,
      },
      products,
      messages,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return res.status(500).json({ message: "No se pudo cargar el panel." });
  }
});

router.get("/products", authenticateToken, async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    console.error("Admin products error:", error);
    return res.status(500).json({ message: "No se pudieron cargar los productos." });
  }
});

router.post("/products", authenticateToken, async (req, res) => {
  try {
    const { data: productData, error } = validateProductInput(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const product = await Product.create(productData);
    return res.status(201).json(product);
  } catch (error) {
    console.error("Admin create product error:", error);
    return res.status(500).json({ message: "No se pudo crear el producto." });
  }
});

router.put("/products/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidProductId(id)) {
      return res.status(400).json({ message: "ID de producto inválido." });
    }

    const { data: productData, error } = validateProductInput(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    return res.json(product);
  } catch (error) {
    console.error("Admin update product error:", error);
    return res.status(500).json({ message: "No se pudo actualizar el producto." });
  }
});

router.delete("/products/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidProductId(id)) {
      return res.status(400).json({ message: "ID de producto inválido." });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    return res.json({ success: true, message: "Producto eliminado." });
  } catch (error) {
    console.error("Admin delete product error:", error);
    return res.status(500).json({ message: "No se pudo eliminar el producto." });
  }
});

router.get("/messages", authenticateToken, async (_req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (error) {
    console.error("Admin messages error:", error);
    return res.status(500).json({ message: "No se pudieron cargar los mensajes." });
  }
});

export default router;
