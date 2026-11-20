import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Admin from "./model/Admin.js";

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

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

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

  console.log(`Admin ready: ${String(adminUsername).trim().toLowerCase()}`);
}

seed()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
