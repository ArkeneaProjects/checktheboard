const User = require('../models/User');
const Hospital = require('../models/Hospital')
const emailTemplates = require('../models/EmailTemplates');
const message = require('../config/messages')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resFormat = require('../helpers/responseFormat');
const crypto = require('crypto');


//create hospital
exports.creatHospital = async (req, res) => {
  try {
    const newHospital = new Hospital(req.body);
    await newHospital.save();

    res.send(resFormat.rSuccess({ message:  message.createHospital}))
  } catch (error) {
    console.log("*******error******", error)
    res.status(500).json({ message: message.error});
  }
};

// Update a particular Hospital details
exports.updateHospitalDetails = async (req, res) => {
  try{
    let { query, updateBody } = req.body

    const hospital = await Hospital.updateOne(query, { $set: updateBody })

    res.send(resFormat.rSuccess(hospital))
  } catch (error){
    console.log("*******error******", error)
    res.status(500).json({ message: message.error});
  }
}


