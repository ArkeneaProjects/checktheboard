const User = require('../models/User');
const message = require('../config/messages')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resFormat = require('./../helpers/responseFormat');

/**
 * For login
 * @param {email,hash} req 
 * @param {userdetails,expiresIn,token} res 
 * @returns 
 */

exports.login = async (req, res) => {
  try {
    const { email, hash } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      res.send(resFormat.rError(message.login.invalidPassword))
    } else {
      if (user.hash == undefined || user.hash == null) {
        res.send(resFormat.rError(message.login.invalidPassword))
      } else {
        const isPasswordValid = await bcrypt.compare(hash, user.hash);
        if (!isPasswordValid) {
          res.send(resFormat.rError(message.login.invalidPassword))
        } else {
          const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
          res.send(resFormat.rSuccess({ message: message.login.success, "userDetails": user, "token": token, expiresIn: '1h' }))
        }
      }
    }
  } catch (error) {
    console.log("*******error******", error)
    res.status(401).send(resFormat.rError({ message: message.serverError }))
  }
};

//create user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send(resFormat.rSuccess({ message: message.createUser }))
  } catch (error) {
    console.log("*******error******", error)
    res.status(500).json({ message: message.error });
  }
};

<<<<<<< HEAD
// Update a particular user details
exports.updateUserDetails = async (req, res) => {
  try{
    let { updateBody, query } = req.body

    const user = await User.updateOne(query, { $set: updateBody })

    res.send(resFormat.rSuccess({message: message.createHospital}))
  } catch (error){
    console.log("*******error******", error)
    res.status(500).json({ message: message.error});
  }
}

// Get user details by using email address for unique email
exports.getUser = async (req, res) => {
  try {
    let { query, fields } = req.body
    var userExists = await User.findOne(query, fields)

    if (userExists) {
      res.status(200).send(resFormat.rSuccess({ message: message.createHospital }));
    } else {
      return res.status(200).send({ status: message.createHospital })
    }
  } catch (error){
    console.log("*******error******", error)
    res.status(500).json({ message: message.error});
  }
}

//create hospital
exports.createHospital = async (req, res) => {
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
=======
//get all users list
exports.getUserList = async (req, res) => {
  try {
    const { query, fields, order, offset, limit } = req.body;
    let userList = await User.find(query, fields)
      .collation({ 'locale': 'en' }) //to ignore case sensitive.
      .sort(order).skip(offset).limit(limit)
    let totalCount = await User.find(query).count()
    res.send(resFormat.rSuccess({ userList: userList, totalCount: totalCount }))
  } catch (error) {
    console.log("*******error******", error)
    res.send(resFormat.rError({ message: message.serverError }))
  }
}
>>>>>>> f7308b5a3975a5a202f9d99eea1a3ea47542ff30
