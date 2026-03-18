const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// TO Dashboard
router.get('/dashboard',
  verifyToken,
  authorizeRoles('TECHNICAL_OFFICER'),
  (req, res) => {
    res.json({
      message: 'Welcome Technical Officer Dashboard',
      user: req.user
    });
  }
);

module.exports = router;

