const { Router } = require('express');
const { body } = require('express-validator');
const { register, login, refreshToken, logout } = require('../controllers/auth');
const { validateRequest } = require('../middleware/validation');

const router = Router();

// Validation rules
const registerValidation = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Routes
router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

module.exports = router;
