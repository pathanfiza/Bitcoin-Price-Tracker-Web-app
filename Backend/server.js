// server.js (ESM format)

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; // ✅ Must have a default export in authRoutes.js

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:8100", // Ionic default port
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
