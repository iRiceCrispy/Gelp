const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('username')
  .isLength({ min: 4 })
  .withMessage('Please provide a username with at least 4 characters.')
  .bail()
  .not().isEmail()
  .withMessage('Username cannot be an email.'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('confirmPassword')
    .custom((value, { req }) => {
      console.log(value === req.body.password)
      if (value !== req.body.password) {
        throw new Error('Password and Confirm Password does not match.');
      }
      return true;
    }),
  handleValidationErrors,
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
