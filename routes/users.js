import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// @route    POST /api/users
// @desc     Register a user
// @access   Public
router.post('/', [
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please Enter a password with 6 or more Characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  } 

  const { name, email, password} = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) { res.status(400).json({ msg: "User Already Exists!" }); }

    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.save();
    res.status(201).json({ msg: "User Created!" });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error!" });
  }
  
});

export default router;