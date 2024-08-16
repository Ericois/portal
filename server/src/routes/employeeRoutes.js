const express = require('express');
const { getEmployeeScores, getAverageScores } = require('../controllers/employeeController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to fetch employee scores
router.get('/scores', authenticateToken, getEmployeeScores);

// Route to fetch average scores
router.get('/average-scores', authenticateToken, getAverageScores);

module.exports = router;
