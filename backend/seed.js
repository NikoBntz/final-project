import "dotenv/config";
import mongoose from "mongoose";
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
];

try {
  await mongoose.connect(process.env.MONGO_URI);
  for (const product of products) {
    await Product.updateOne(
      { name: product.name },
      { $set: product },
      { upsert: true },
    );
  }
  console.log(`Seeded ${products.length} product(s)`);
} catch (error) {
  console.error("Seed error:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
