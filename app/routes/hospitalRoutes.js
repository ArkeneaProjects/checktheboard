// app/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/hospitalController');

router.post('/creatHospital', userController.creatHospital);
router.post('/updateHospitalDetails', userController.updateHospitalDetails);


module.exports = router;