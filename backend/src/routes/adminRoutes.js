const express = require('express');
const router = express.Router();

const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');
const {
  getAdminDashboard,
  getAllUsers,
  deleteUser
} = require('../controllers/adminController');

// ===============================
// 🔹 Admin Dashboard
// ===============================
router.get(
  '/dashboard',
  verifyToken,
  authorizeRoles('ADMIN'),
  getAdminDashboard
);

// ===============================
// 🔹 Get All Users
// ===============================
router.get(
  '/users',
  verifyToken,
  authorizeRoles('ADMIN'),
  getAllUsers
);

// ===============================
// 🔹 Delete User
// ===============================
router.delete(
  '/users/:id',
  verifyToken,
  authorizeRoles('ADMIN'),
  deleteUser
);

module.exports = router;
