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

/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     summary: Forgot password using phone or email
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                   type: string
 *               value:
 *                   type: string
 
 *     responses:
 *       200:
 *         description: send OTP to user
 */
router.post('/forgotPassword', mobileController.forgotPassword);

/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     summary: Forgot password using phone or email
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                   type: string
 *               value:
 *                   type: string
 *               otp:
 *                   type: string
 
 *     responses:
 *       200:
 *         description: verify OTP 
 */
router.post('/verifyCode', mobileController.verifyCode);

/**
 * @swagger
 * /setPassword:
 *   post:
 *     summary: Forgot password using phone or email
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                   type: string
 *               value:
 *                   type: string
 
 *     responses:
 *       200:
 *         description: set password
 */
router.post('/setPassword', mobileController.setPassword);

/**
 * @swagger
 * /getCms:
 *   post:
 *     summary: get CMS content
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                   type: string
 
 *     responses:
 *       200:
 *         description: get CMS content
 */
router.post('/getCms', mobileController.getCms);

/**
 * @swagger
 * /getProfile:
 *   post:
 *     summary: get user details
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                   type: string
 
 *     responses:
 *       200:
 *         description: get CMS content
 */
router.post('/getProfile', mobileController.getProfile);

/**
 * @swagger
 * /updateProfile:
 *   post:
 *     summary: get user details
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                   type: string
 *               updateInfo:
 *                   type: object
 * 
 
 *     responses:
 *       200:
 *         description: get CMS content
 */
router.post('/updateProfile', mobileController.updateProfile);


module.exports = router;