import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";
import Contact from "../models/Contact";

const router = Router();

// POST /api/contacts — submit contact form
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, and message are required." });
    }

    const contact = await Contact.create({
      name,
      email,
      subject: subject || "General Inquiry",
      message,
    });

    res.status(201).json({ contact, message: "Your message has been received." });
  } catch (err) {
    console.error("Error submitting contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/contacts — list all (JWT protected)
router.get("/", requireAuth, async (_req: Request, res: Response) => {
  try {
    const contacts = await Contact.findAll({
      order: [["created_at", "DESC"]],
    });
    res.json({ contacts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// PATCH /api/contacts/:id/read — mark as read (JWT protected)
router.patch("/:id/read", requireAuth, async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });

    await contact.update({ read: true });
    res.json({ contact });
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact" });
  }
});

export default router;
