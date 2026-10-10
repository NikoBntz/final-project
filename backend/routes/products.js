import { Router } from "express";
import Product from "../model/Product.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error loading products:", error);
    res.status(500).json({ message: "Could not load products" });
  }
});

export default router;
