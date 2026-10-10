import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import Admin from "../model/Admin.js";
import Product from "../model/Product.js";
import Message from "../model/Message.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "levinor-dev-secret";

function authenticateToken(req, res, next) {
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

router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "Usuario y contraseña son obligatorios." });
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
    const { name, price, description, category, imageUrl } = req.body || {};

    if (!name || !description || !category) {
      return res.status(400).json({ message: "Nombre, descripción y categoría son obligatorios." });
    }

    const productData = {
      name: String(name).trim(),
      description: String(description).trim(),
      category: String(category).trim(),
      imageUrl: String(imageUrl || "").trim(),
      price: Number(price ?? 0),
    };

    if (!productData.name || !productData.description || !productData.category) {
      return res.status(400).json({ message: "Los campos principales no pueden estar vacíos." });
    }

    if (Number.isNaN(productData.price)) {
      return res.status(400).json({ message: "El precio debe ser un número válido." });
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
    const { name, price, description, category, imageUrl } = req.body || {};

    if (!name || !description || !category) {
      return res.status(400).json({ message: "Nombre, descripción y categoría son obligatorios." });
    }

    const productData = {
      name: String(name).trim(),
      description: String(description).trim(),
      category: String(category).trim(),
      imageUrl: String(imageUrl || "").trim(),
      price: Number(price ?? 0),
    };

    if (Number.isNaN(productData.price)) {
      return res.status(400).json({ message: "El precio debe ser un número válido." });
    }

    const product = await Product.findByIdAndUpdate(id, productData, { new: true });

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
