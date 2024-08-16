const express = require('express');
const { getTenantData, updateTenantData } = require('../controllers/profileController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to fetch tenant data
router.get('/tenant', authenticateToken, getTenantData);

// Route to update tenant data
router.put('/tenant', authenticateToken, updateTenantData);

module.exports = router;
