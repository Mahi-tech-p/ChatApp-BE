import dotenv from "dotenv";
dotenv.config();

import http from "http";
import mongoose from "mongoose";

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

const gracefulShutdown = async () => {
  console.log("Starting graceful shutdown");

  try {
    server.close(async () => {
      console.log("HTTP server closed");

      await mongoose.connection.close();

      console.log("MongoDB connection closed");

      process.exit(0);
    });

    setTimeout(() => {
      console.error("Forced shutdown");

      process.exit(1);
    }, 10000);

  } catch (error) {
    console.error("Shutdown error:", error);

    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);

    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);

  process.exit(1);
});

startServer();