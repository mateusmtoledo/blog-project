const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const userResponse = { ...req.user.toJSON() };
  delete userResponse.password;
  delete userResponse.__v;
  res.json({
    user: userResponse,
  });
});

module.exports = router;
