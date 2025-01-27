// app/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/login', userController.login);
router.post('/createUser', userController.createUser);
router.post('/updateUserDetails', userController.updateUserDetails);
router.post('/getUserByEmails', userController.getUserByEmails);
router.post('/createHospital', userController.createHospital);
router.post('/updateHospitalDetails', userController.updateHospitalDetails);

module.exports = router;