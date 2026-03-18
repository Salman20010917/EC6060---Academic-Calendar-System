const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validationMiddleware');

const {
  createTodo,
  getMyTodos,
  updateTodo,
  deleteTodo,
  toggleTodoStatus
} = require('../controllers/todoController');

// ==============================
// 🔹 Create Todo
// ==============================
router.post(
  '/',
  verifyToken,
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required'),

    body('description')
      .trim()
      .optional(),

    body('due_date')
      .optional()
      .isISO8601()
      .withMessage('Due date must be a valid date')
  ],
  validate,
  createTodo
);

// ==============================
// 🔹 Get My Todos
// ==============================
router.get(
  '/',
  verifyToken,
  getMyTodos
);

// ==============================
// 🔹 Update Todo
// ==============================
router.put(
  '/:id',
  verifyToken,
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required'),

    body('description')
      .trim()
      .optional(),

    body('due_date')
      .optional()
      .isISO8601()
      .withMessage('Due date must be a valid date')
  ],
  validate,
  updateTodo
);

// ==============================
// 🔹 Delete Todo
// ==============================
router.delete(
  '/:id',
  verifyToken,
  deleteTodo
);

// ==============================
// 🔹 Toggle Todo Status
// ==============================
router.patch(
  '/:id/toggle',
  verifyToken,
  toggleTodoStatus
);

module.exports = router;
