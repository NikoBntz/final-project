import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Admin from "./model/Admin.js";
import Product from "./model/Product.js";

const products = [
  {
    name: "Espejo de baño",
    price: 49,
    description: "Espejo funcional para complementar tu baño.",
    category: "Decoración",
    imageUrl:
      "https://media.adeo.com/mkp/f7254a89ae12740402c3e7e8377556e7/media.png?width=650&height=650&format=jpg&quality=80&fit=bounds",
  },
  {
    name: "Recibidor para sala",
    price: 60,
    description: "Espejo funcional para complementar tu sala.",
    category: "Decoración",
    imageUrl:
      "https://media.adeo.com/mkp/f7254a89ae12740402c3e7e8377556e7/media.png?width=650&height=650&format=jpg&quality=80&fit=bounds",
  },
];

const adminUsername = process.env.ADMIN_USERNAME || "admin";
const adminPassword = process.env.ADMIN_PASSWORD || "levinor123";

try {
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
  console.log(`Admin ready: ${adminUsername} / ${adminPassword}`);
} catch (error) {
  console.error("Seed error:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
