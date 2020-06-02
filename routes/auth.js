const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

//@route           GET  api/auth
//@description     Get logged in user
//@access          Private
router.get('/', auth, async (req, res) => {
  try {
    //Asagidaki req.user.id, auth middleware'deki req.user = decoded.user'dan  buraya gonderilmis oluyor
    const user = await User.findById(req.user.id).select('-password'); //buradaki select('-password') ile password u gonderme demis oluyoruz
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route           POST  api/auth
//@description     Auth user & get token (Log in)
//@access          Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'invalid Credentials' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        },
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  },
);

module.exports = router;
