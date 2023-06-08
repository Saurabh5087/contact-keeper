import express from 'express';
import User from '../models/User.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post('/', [
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please Enter a password with 6 or more Characters').isLength({ min: 6 })
],(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  } 

  res.send(req.body);
  
});

export default router;