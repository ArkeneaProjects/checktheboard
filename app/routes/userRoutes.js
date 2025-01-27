// app/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/getUserList', userController.getUserList);
router.post('/createUser', userController.createUser);

module.exports = router;