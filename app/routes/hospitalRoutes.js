// app/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

router.post('/creatHospital', hospitalController.creatHospital);
router.post('/updateHospitalDetails', hospitalController.updateHospitalDetails);
router.post('/getHospitalDetails', hospitalController.getHospitalDetails);
router.post('/getAllHopitals', hospitalController.getAllHopitals);


module.exports = router;