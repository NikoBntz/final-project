import "dotenv/config";
import mongoose from "mongoose";
import { createApp } from "./app.js";

const PORT = Number(process.env.PORT || 3030);
const HOST = process.env.HOST || "0.0.0.0";
const DB_RETRY_DELAY_MS = 10000;
const DB_SELECTION_TIMEOUT_MS = 10000;
let isShuttingDown = false;
let databaseWorkerRunning = false;
const app = createApp();

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function superviseDatabase() {
  if (databaseWorkerRunning) return;

  databaseWorkerRunning = true;

  try {
    while (!isShuttingDown && mongoose.connection.readyState !== 1) {
      try {
        if (!process.env.MONGO_URI) {
          throw new Error("MONGO_URI is not configured.");
        }

        await mongoose.connect(process.env.MONGO_URI, {
          serverSelectionTimeoutMS: DB_SELECTION_TIMEOUT_MS,
        });
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error(
          `MongoDB connection failed: ${error.message.split("\n")[0]}`,
        );
        console.error(
          "Check MONGO_URI and MongoDB Atlas Network Access settings.",
        );
        await wait(DB_RETRY_DELAY_MS);
      }
    }
  } finally {
    databaseWorkerRunning = false;
  }
}

function monitorDatabase() {
  if (!isShuttingDown) {
    superviseDatabase().catch((error) => {
      console.error("Database connection worker stopped:", error);
    });
  }
}

mongoose.connection.on("disconnected", monitorDatabase);

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
  monitorDatabase();
});

async function shutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log(`Received ${signal}. Shutting down...`);

  const forceShutdown = setTimeout(() => {
    process.exit(1);
  }, 20000);
  forceShutdown.unref();

  server.close(async () => {
    try {
      await mongoose.disconnect();
      clearTimeout(forceShutdown);
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  });
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
