const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Game, Review, User } = require('../../db/models');

const router = express.Router();

const validateRating = [
  check('body')
    .isLength({min: 5 })
    .withMessage('Please provide a meaningful review with at least 5 characters.'),
  check('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5 stars'),
  handleValidationErrors,
];

// Get all games
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username'],
        },
        {
          model: Game,
          as: 'game',
          attributes: ['title'],
        },
      ],
    });

    return res.json(reviews);
  })
);

// Edit a review
router.put(
  '/:id(\\d+)',
  validateRating,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const { body, rating } = req.body;

    const review = await Review.findByPk(id);

    review.body = body;
    review.rating = rating;

    await review.save();

    return res.json(review);
  })
);

// Delete a review
router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const review = await Review.findByPk(id);

    await review.destroy();

    return res.json({ message: `Deleted review ${review.id}` });
  })
);

module.exports = router;
