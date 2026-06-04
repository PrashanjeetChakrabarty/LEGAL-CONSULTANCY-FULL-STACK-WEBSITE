import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "fv_legal_super_secret";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@fvlegal.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "root123";

// POST /api/admin/login — authenticate admin
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Support both plain-text and bcrypt-hashed passwords
    let isValid = false;
    if (ADMIN_PASSWORD.startsWith("$2")) {
      isValid = await bcrypt.compare(password, ADMIN_PASSWORD);
    } else {
      isValid = password === ADMIN_PASSWORD;
    }

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email, role: "admin" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
