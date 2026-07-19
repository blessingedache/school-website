import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import studentRoutes from "./src/routers/studentRouter.js";

const app = express();
const port = process.env.PORT || 4000;

// ---- Middleware ----
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Serve uploaded avatars statically
app.use("/uploads", express.static("uploads"));

// ---- CORS ----
// Reads allowed origins from .env (comma-separated), plus always allows localhost during dev
const allowedOrigins = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const vercelPreviewPattern = /^https:\/\/school-website-.*-blessing-edaches-projects\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || vercelPreviewPattern.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ---- Database ----
async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}
connectDatabase();

// ---- Routes ----
app.get("/home", (req, res) => {
  res.status(200).json({ message: "welcome home" });
});

app.use("/api/v1", studentRoutes);

// ---- Fallback 404 handler ----
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});