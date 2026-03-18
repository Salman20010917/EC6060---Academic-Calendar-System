// src/controllers/adminController.js

const db = require('../config/db');

// ===============================
// 🔹 Admin Dashboard
// ===============================
exports.getAdminDashboard = (req, res) => {
  res.json({
    message: "Welcome Admin Dashboard",
    user: req.user
  });
};

// ===============================
// 🔹 Get All Users
// ===============================
exports.getAllUsers = (req, res) => {

  const query = `
    SELECT id, first_name, last_name, email, role, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(results);
  });
};

// ===============================
// 🔹 Delete User
// ===============================
exports.deleteUser = (req, res) => {

  const userId = req.params.id;

  db.query(
    `DELETE FROM users WHERE id = ?`,
    [userId],
    (err, result) => {

      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "User not found" });

      res.json({ message: "User deleted successfully" });
    }
  );
};
