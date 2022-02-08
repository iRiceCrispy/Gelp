const express = require('express');
const asyncHandler = require('express-async-handler');
const { Game } = require('../../db/models');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const games = await Game.findAll({
      order: [['updatedAt', 'DESC']],
    });

    return res.json(games);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { ownerId, title, description, url, steamUrl, releaseDate, currentVersion } = req.body;

    const game = await Game.create({
      ownerId,
      title,
      description,
      url,
      steamUrl,
      releaseDate,
      currentVersion,
    });

    return res.status(201).json({ game });
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const game = await Game.findOne({
      where: { id },
      include: ['Reviews'],
    });

    return res.json({ game });
  })
);

router.put(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, url, steamUrl, releaseDate, currentVersion } = req.body;

    const game = await Game.findByPk(id);

    if (title) game.title = title;
    if (description) game.description = description;
    if (url) game.url = url;
    if (steamUrl) game.steamUrl = steamUrl;
    if (releaseDate) game.releaseDate = releaseDate;
    if (currentVersion) game.currentVersion = currentVersion;

    await game.save();

    return res.json({ game });
  })
);

router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const game = await Game.findByPk(id);

    await game.destroy();

    return res.json({ message: `Deleted game ${game.id}` });
  })
);

module.exports = router;