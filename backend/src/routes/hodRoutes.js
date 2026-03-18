const express = require('express');
const router = express.Router();

const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');
const {
  getPendingEvents,
  approveEvent,
  rejectEvent,
  getNotifications
} = require('../controllers/hodController');


// 🔹 HOD Dashboard
router.get(
  '/dashboard',
  verifyToken,
  authorizeRoles('HOD'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Welcome HOD Dashboard',
      user: req.user
    });
  }
);


// 🔹 Get All Pending Events
router.get(
  '/pending-events',
  verifyToken,
  authorizeRoles('HOD'),
  getPendingEvents
);


// 🔹 Approve Event
router.put(
  '/approve/:eventId',
  verifyToken,
  authorizeRoles('HOD'),
  approveEvent
);


// 🔹 Reject Event
router.put(
  '/reject/:eventId',
  verifyToken,
  authorizeRoles('HOD'),
  rejectEvent
);


// 🔔 Get HOD Notifications
router.get(
  '/notifications',
  verifyToken,
  authorizeRoles('HOD'),
  getNotifications
);


module.exports = router;
