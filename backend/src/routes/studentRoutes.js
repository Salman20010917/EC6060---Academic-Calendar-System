const express = require('express');
const router = express.Router();

const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');
const { getApprovedEvents } = require('../controllers/studentController');


// 🔹 Student Dashboard
router.get(
  '/dashboard',
  verifyToken,
  authorizeRoles('STUDENT'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Welcome Student Dashboard',
      user: req.user
    });
  }
);


// 🔹 Get Approved Events (Calendar View)
router.get(
  '/events',
  verifyToken,
  authorizeRoles('STUDENT'),
  getApprovedEvents
);


module.exports = router;
