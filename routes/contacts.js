import express from 'express';
import User from '../models/User.js';
import Contact from '../models/Contact.js';
import auth from '../middleware/auth.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// @route    GET /api/contacts
// @desc     Get all contacts of logged in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ contacts});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route    POST /api/contacts
// @desc     Add new contacts
// @access   Private
router.post('/', (req, res) => {
  res.send("Add contact");
});

// @route    PUT /api/contacts/:id
// @desc     Update Contact
// @access   Private
router.put('/:id', (req, res) => {
  res.send("Update a contact");
});

// @route    DELETE /api/contacts/:id
// @desc     Delete Contact
// @access   Private
router.delete('/:id', (req, res) => {
  res.send("Delete a contact");
});

export default router;