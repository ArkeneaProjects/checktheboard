// app/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/getUserList', userController.getUserList);
router.post('/createUser', userController.createUser);
router.post('/resendInvitation', userController.resendInvitation);
router.post('/updateUserDetails', userController.updateUserDetails);
router.post('/getUser', userController.getUser);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/verifyOtp', userController.verifyOtp);
router.post('/resendOtp', userController.resendOtp);

module.exports = router;