import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Admin from "./model/Admin.js";
import Product from "./model/Product.js";

const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminUsername) {
  throw new Error("ADMIN_USERNAME is required.");
}

if (!adminPassword) {
  throw new Error("ADMIN_PASSWORD is required.");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is required.");
}

const products = [
  {
    name: "Cocina a medida",
    price: 1200,
    description: "Cocina personalizada diseñada para aprovechar cada espacio.",
    category: "Cocinas",
    imageUrl: "",
  },
  {
    name: "Closet residencial",
    price: 850,
    description: "Closet modular adaptado al área y necesidades del hogar.",
    category: "Closets",
    imageUrl: "",
  },
  {
    name: "Escritorio ejecutivo",
    price: 480,
    description: "Escritorio de trabajo fabricado a la medida.",
    category: "Oficina",
    imageUrl: "",
  },
  {
    name: "Centro de entretenimiento",
    price: 650,
    description: "Mueble para televisión y almacenamiento audiovisual.",
    category: "Sala",
    imageUrl: "",
  },
  {
    name: "Anaquel de exposición",
    price: 420,
    description: "Anaquel funcional para comercios y oficinas.",
    category: "Comercio",
    imageUrl: "",
  },
  {
    name: "Cabecera personalizada",
    price: 380,
    description: "Cabecera diseñada según medidas y estilo del dormitorio.",
    category: "Dormitorio",
    imageUrl: "",
  },
  {
    name: "Mesa a medida",
    price: 550,
    description: "Mesa fabricada con medidas y acabados personalizados.",
    category: "Comedor",
    imageUrl: "",
  },
  {
    name: "Mueble especial",
    price: 0,
    description: "Diseño especial. Precio sujeto a cotización.",
    category: "Personalizado",
    imageUrl: "",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Product.deleteMany({
    $or: [
      { name: { $exists: false } },
      { description: { $exists: false } },
      { category: { $exists: false } },
      { price: { $exists: false } },
      { price: { $not: { $type: "number" } } },
      { price: { $lt: 0 } },
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
  await Admin.updateOne(
    { username: String(adminUsername).trim().toLowerCase() },
    {
      $set: {
        username: String(adminUsername).trim().toLowerCase(),
        passwordHash,
        name: "Levinor Admin",
      },
    },
    { upsert: true },
  );

  console.log(`Seeded ${products.length} product(s)`);
  console.log(
    `Admin ready: ${String(adminUsername).trim().toLowerCase()}`,
  );
}

seed()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
