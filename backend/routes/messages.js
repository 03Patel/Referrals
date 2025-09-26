const express = require("express");
const auth = require("../middleware/auth");
const Message = require("../models/Message");

const router = express.Router();

// Send Message
router.post("/", auth, async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const message = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      text
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Conversation with a User
router.get("/:userId", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
