const express = require('express');
const { update, deleteUser, getUserData } = require('../controllers/user.js');
const { verifyToken } = require('../verifyToken.js');

const router = express.Router();

// Update user
router.put('/:id', verifyToken, update);

// Delete user
router.delete('/:id', verifyToken, deleteUser);

// Get a user
router.get('/getuser', verifyToken, getUserData);

module.exports = router;
