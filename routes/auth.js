import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/User.js';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route    GET /api/auth
// @desc     Get logged in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    POST /api/auth
// @desc     Auth user and get token
// @access   Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  } 

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user._id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 36000
    }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error!" });
  }
  
});

export default router;