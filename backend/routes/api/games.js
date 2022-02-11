const express = require('express');
const asyncHandler = require('express-async-handler');
const { Game, Review } = require('../../db/models');

const router = express.Router();

// Get all games
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const games = await Game.findAll();

    return res.json(games);
  })
);

// Create a new game
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { ownerId, title, description, image, url, downloadLink, releaseDate } = req.body;

    const game = await Game.create({
      ownerId,
      title,
      description,
      image,
      url,
      downloadLink,
      releaseDate,
    });

    return res.status(201).json(game);
  })
);

// Get a single game
router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const game = await Game.findOne({
      where: { id },
      include: ['Reviews'],
    });

    return res.json(game);
  })
);

// Edit a game
router.put(
  '/:id(\\d+)',
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
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.gameId);
    const { userId, body, rating } = req.body;

    const review = await Review.create({
      userId,
      gameId,
      body,
      rating,
    });

    return res.status(201).json(review);
  })
);

module.exports = router;
