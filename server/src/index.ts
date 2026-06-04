import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db";
import consultationRoutes from "./routes/consultations";
import contactRoutes from "./routes/contacts";
import adminRoutes from "./routes/admin";

const app = express();
const PORT = parseInt(process.env.PORT || "5001");

// ─── Security Headers ────────────────────────────────────────────────────────
app.use(helmet());

// ─── Rate Limiting ───────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use("/api/", apiLimiter);

// ─── CORS ───────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      process.env.ADMIN_URL || "http://localhost:4000",
    ],
    credentials: true,
  })
);

// ─── Body Parsers ────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "F&V Legal Server is running ✅",
    database: "MySQL (Sequelize)",
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get("/", (_req, res) => {
  res.send(`
    <html>
      <body style="background: black; color: white; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column;">
        <h1>F&V Legal API Server</h1>
        <p>Status: Online</p>
        <p>Port: ${PORT}</p>
      </body>
    </html>
  `);
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/consultations", consultationRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/admin", adminRoutes);

// ─── 404 Fallback ────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── Start ────────────────────────────────────────────────────────────────────
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n🚀 F&V Legal API Server running on http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
  });
};

start();
