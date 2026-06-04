import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";
import Consultation from "../models/Consultation";

const router = Router();

// POST /api/consultations — create a new consultation booking
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, practiceArea, consultationMode, description } = req.body;

    if (!name || !email || !description) {
      return res
        .status(400)
        .json({ error: "Name, email, and description are required." });
    }

    const consultation = await Consultation.create({
      name,
      email,
      phone: phone || null,
      practiceArea: practiceArea || "Corporate Law",
      consultationMode: consultationMode || "online",
      description,
      status: "pending",
    });

    res.status(201).json({ consultation });
  } catch (err: any) {
    console.error("Error creating consultation:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/consultations — list all (JWT protected)
router.get("/", requireAuth, async (_req: Request, res: Response) => {
  try {
    const consultations = await Consultation.findAll({
      order: [["created_at", "DESC"]],
    });
    res.json({ consultations });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch consultations" });
  }
});

// PATCH /api/consultations/:id/status — update consultation status
router.patch("/:id/status", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const consultation = await Consultation.findByPk(id);
    if (!consultation) {
      return res.status(404).json({ error: "Consultation not found" });
    }

    consultation.status = status;
    await consultation.save();

    res.json({ success: true, consultation });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

export default router;
