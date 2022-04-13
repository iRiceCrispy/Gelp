const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Game, Review, User } = require('../../db/models');

const router = express.Router();

const validateGame = [
  check('title').exists({ checkFalsy: true }).withMessage('Please provide a valid game title'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid game description'),
  handleValidationErrors,
];

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
    const games = await Game.findAll({
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['username'],
        },
      ],
    });

    return res.json(games);
  })
);

// Create a new game
router.post(
  '/',
  validateGame,
  asyncHandler(async (req, res) => {
    const { ownerId, title, description, image, url, downloadLink, releaseDate } = req.body;

    const g = await Game.create({
      ownerId,
      title,
      description,
      image,
      url,
      downloadLink,
      releaseDate,
    });

    const game = await Game.findByPk(g.id, {
      include: {
        model: User,
        as: 'owner',
        attributes: ['username'],
      },
    });

    console.log(game);

    return res.status(201).json(game);
  })
);

// Get a single game
router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const game = await Game.findByPk(id, {
      include: [
        {
          model: Review,
          as: 'reviews',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['username'],
            },
          ],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['username'],
        },
      ],
    });

    return res.json(game);
  })
);

// Edit a game
router.put(
  '/:id(\\d+)',
  validateGame,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, image, url, downloadLink, releaseDate, currentVersion } = req.body;

    const game = await Game.findByPk(id);

    game.title = title;
    game.description = description;
    game.image = image;
    game.url = url;
    game.downloadLink = downloadLink;
    game.releaseDate = releaseDate;
    game.currentVersion = currentVersion;

    await game.save();

    return res.json(game);
  })
);

// Delete a game
router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const game = await Game.findByPk(id);

    await game.destroy();

    return res.json({ message: `Deleted game ${game.id}` });
  })
);

// Add a review for a game
router.post(
  '/:gameId(\\d+)/reviews',
  validateRating,
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.gameId);
    const { userId, body, rating } = req.body;

    const rev = await Review.create({
      userId,
      gameId,
      body,
      rating,
    });

    const review = await Review.findByPk(rev.id, {
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

    return res.status(201).json(review);
  })
);

module.exports = router;
