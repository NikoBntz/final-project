import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Admin from "./model/Admin.js";
import Product from "./model/Product.js";

const products = [
  {
    name: "Cocina integral moderna",
    price: 1200,
    description:
      "Soluciones de cocina a medida con almacenamiento funcional, acabados elegantes y distribución optimizada.",
    category: "Cocinas",
    imageUrl:
      "https://media.adeo.com/mkp/f7254a89ae12740402c3e7e8377556e7/media.png?width=650&height=650&format=jpg&quality=80&fit=bounds",
  },
  {
    name: "Closet empotrado",
    price: 980,
    description:
      "Diseños para dormitorios y espacios pequeños, con compartimentos y cajones pensados para cada necesidad.",
    category: "Closets",
    imageUrl:
      "https://media.adeo.com/mkp/f7254a89ae12740402c3e7e8377556e7/media.png?width=650&height=650&format=jpg&quality=80&fit=bounds",
  },
  {
    name: "Anaqueles flotantes",
    price: 360,
    description:
      "Estanterías decorativas y funcionales para salas, baños y oficinas con un acabado limpio y moderno.",
    category: "Anaqueles",
    imageUrl:
      "https://media.adeo.com/mkp/f7254a89ae12740402c3e7e8377556e7/media.png?width=650&height=650&format=jpg&quality=80&fit=bounds",
  },
  {
    name: "Escritorio de oficina",
    price: 640,
    description:
      "Muebles de trabajo y orden para espacios productivos, con diseño práctico y visual atractivo.",
    category: "Oficina",
    imageUrl:
      "https://media.adeo.com/mkp/f7254a89ae12740402c3e7e8377556e7/media.png?width=650&height=650&format=jpg&quality=80&fit=bounds",
  },
  {
    name: "Mueble de almacenamiento",
    price: 520,
    description:
      "Soluciones de guardado para entradas, baños, habitaciones y espacios multifuncionales.",
    category: "Almacenamiento",
    imageUrl:
      "https://media.adeo.com/mkp/f7254a89ae12740402c3e7e8377556e7/media.png?width=650&height=650&format=jpg&quality=80&fit=bounds",
  },
  {
    name: "Bar decorativo",
    price: 430,
    description:
      "Piezas decorativas y funcionales para realzar ambientes residenciales o comerciales.",
    category: "Decoración",
    imageUrl:
      "https://media.adeo.com/mkp/f7254a89ae12740402c3e7e8377556e7/media.png?width=650&height=650&format=jpg&quality=80&fit=bounds",
  },
  {
    name: "Cocina tipo L",
    price: 1500,
    description:
      "Diseño enfocado en máxima utilidad para espacios con circulación constante y almacenamiento vertical.",
    category: "Cocinas",
    imageUrl:
      "https://media.adeo.com/mkp/f7254a89ae12740402c3e7e8377556e7/media.png?width=650&height=650&format=jpg&quality=80&fit=bounds",
  },
  {
    name: "Sistema de closets",
    price: 1050,
    description:
      "Sistema completo con cajones, barras, repisas y ala modular adaptada a la altura del espacio.",
    category: "Closets",
    imageUrl:
      "https://media.adeo.com/mkp/f7254a89ae12740402c3e7e8377556e7/media.png?width=650&height=650&format=jpg&quality=80&fit=bounds",
  },
];

const adminUsername = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || "levinor123";

try {
  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD)
  ) {
    throw new Error(
      "ADMIN_USERNAME and ADMIN_PASSWORD are required in production.",
    );
  }

  await mongoose.connect(process.env.MONGO_URI);

  const malformedProducts = await Product.deleteMany({
    $or: [
      { name: { $exists: false } },
      { name: null },
      { name: "" },
      { description: { $exists: false } },
      { description: null },
      { category: { $exists: false } },
      { category: null },
    ],
  });

  for (const product of products) {
    await Product.updateOne(
      { name: product.name },
      { $set: product },
      { upsert: true },
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await Admin.findOneAndUpdate(
    { username: adminUsername },
    {
      $set: {
        username: adminUsername,
        name: "Levinor Admin",
        passwordHash,
      },
    },
    { upsert: true, new: true },
  );

  console.log(`Removed ${malformedProducts.deletedCount} malformed product(s)`);
  console.log(`Seeded ${products.length} product(s)`);
  console.log(`Admin ready: ${adminUsername}`);
} catch (error) {
  console.error("Seed error:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
