const express = require("express");
const auth = require("../middleware/auth");
const Referral = require("../models/Referral");

const router = express.Router();

// Create Referral
router.post("/", auth, async (req, res) => {
  try {
    const { title, company, description } = req.body;
    const referral = await Referral.create({
      user: req.user.id,
      title,
      company,
      description,
      status: "pending"
    });
    res.status(201).json(referral);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get My Referrals
router.get("/", auth, async (req, res) => {
  try {
    const referrals = await Referral.find({ user: req.user.id });
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search / Filter Referrals
router.get("/search", auth, async (req, res) => {
  try {
    const { title, company, status } = req.query;
    let filter = {};
    if (title) filter.title = new RegExp(title, "i");
    if (company) filter.company = new RegExp(company, "i");
    if (status) filter.status = status;

    const referrals = await Referral.find(filter).populate("user", "name email");
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Referral Status
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "accepted", "closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const referral = await Referral.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status },
      { new: true }
    );

    if (!referral) return res.status(404).json({ message: "Referral not found" });

    res.json(referral);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public Feed
router.get("/feed", async (req, res) => {
  try {
    const referrals = await Referral.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
