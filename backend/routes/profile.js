const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');

// GET PROFILE
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate('user', 'name email');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE OR UPDATE PROFILE
router.post('/', auth, async (req, res) => {
  const { education, employment } = req.body;
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      profile.education = education;
      profile.employment = employment;
      await profile.save();
    } else {
      profile = await Profile.create({ user: req.user._id, education, employment });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
