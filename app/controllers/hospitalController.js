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

// Get hospital details for edit
exports.getHospitalDetails = async (req, res) => {
  try{
    const { query, fields } = req.body;
    let hospital = await Hospital.findOne(query, fields);
    if(hospital){
      var userDetails = await User.findOne({_id: hospital.userId}, fields);
    }
    res.send(resFormat.rSuccess({userDetails:userDetails, hospital: hospital}))
  } catch (error){
    console.log("*******error******", error)
    res.status(500).json({ message: message.error});
  }
};

//
// Get all hospital list
exports.getAllHopitals = async (req, res) => {
  try{
    const { query, fields, order, offset, limit } = req.body;
    
    let hospitals = await Hospital.find(query, fields)
      .populate('userId', { firstName: 1, lastName: 1, email: 1, status: 1})
      .collation({ 'locale': 'en' })
      .sort(order).skip(offset).limit(limit)
    //let totalCount = await User.find(query).count()

    res.send(resFormat.rSuccess({ hospitals: hospitals}))
  } catch (error){
    console.log("*******error******", error)
    res.status(500).json({ message: message.error});
  }
};




