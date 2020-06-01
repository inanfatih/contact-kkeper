const express = require('express');
const router = express.Router();

//Buradaki endpointlerin hepsine '/api/contacts' tan geliniyor. Bu yuzden hepsinin basinda bu var.

//@route           GET  api/contacts
//@description     Get all users contacts
//@access          Private

router.post('/', (req, res) => {
  res.send('Get all contacts');
});

//@route           POST api/contacts
//@description     Add new contact
//@access          Private

router.post('/', (req, res) => {
  res.send('Get all contacts');
});

//@route           POST api/contacts/:id
//@description     Update contact
//@access          Private

router.put('/:id', (req, res) => {
  res.send('Update contact');
});

//@route           DELETE api/contacts/:id
//@description     Delete contact
//@access          Private

router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
