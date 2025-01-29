const express = require('express');
const router = express.Router();
const mobileController = require('../controllers/mobileApiController.js');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in and obtain JWT token & user details
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                   type: string
 *               password:
 *                   type: string
 
 *     responses:
 *       200:
 *         description: Successful login with JWT token in response
 */
router.post('/login', mobileController.login);
module.exports = router;