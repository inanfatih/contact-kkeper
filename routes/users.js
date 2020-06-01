const express = require('express');
const router = express.Router();

//@route           POST  api/users
//@description     Register a user
//@access          Public
router.post('/', (req, res) => {
  //Buraya gelen requestler server.js'teki asagidaki method'tan gelecek. Bu yuzden aslinda '/api/users' tan gelmis oluyor ve buradki '/' path'i '/api/users' a refer ediyor
  //app.use('/api/users', requrire('./routes/users'));
  res.send('Register a user');
});

module.exports = router;
