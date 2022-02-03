const router = require('express').Router();
const sessionRouter = require('./session.js');

router.use('/session', sessionRouter);

// test API
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
