import express from 'express';
const router = express.Router();

// @route    GET api/contacts
// @desc     Get all contacts of logged in user
// @access   Private
router.get('/', (req, res) => {
  res.send("Get all contacts of logged in user");
});

// @route    POST api/contacts
// @desc     Add new contacts
// @access   Private
router.post('/', (req, res) => {
  res.send("Add contact");
});

// @route    PUT api/contacts/:id
// @desc     Update Contact
// @access   Private
router.put('/:id', (req, res) => {
  res.send("Update a contact");
});

// @route    DELETE api/contacts/:id
// @desc     Delete Contact
// @access   Private
router.delete('/:id', (req, res) => {
  res.send("Delete a contact");
});

export default router;