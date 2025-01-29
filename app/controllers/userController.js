const User = require('../models/User');
const Hospital = require('../models/Hospital')
const emailTemplates = require('../models/emailTemplates');
const message = require('../config/messages')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resFormat = require('./../helpers/responseFormat');
const crypto = require('crypto');


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
    const user = await newUser.save();

    res.send(resFormat.rSuccess({ userDetails: user,message: message.createUser }))
  } catch (error) {
    console.log("*******error******", error)
    res.status(500).json({ message: message.error });
  }
};

// Update a particular user details
exports.updateUserDetails = async (req, res) => {
  try{
    let { updateBody, query } = req.body

    const user = await User.updateOne(query, { $set: updateBody })

    res.send(resFormat.rSuccess({message: message.userUpdated}))
  } catch (error){
    console.log("*******error******", error)
    res.status(500).json({ message: message.error});
  }
}

// Get user details by using email address for unique email
exports.getUser = async (req, res) => {
  try {
    let { query, fields } = req.body
    var users = await User.findOne(query, fields)

    if (users) {
      res.status(200).send(resFormat.rSuccess(users));
    } else {
      return res.status(200).send({ status: message.userNotFound })
    }
  } catch (error){
    console.log("*******error******", error)
    res.status(500).json({ message: message.error});
  }
}

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

// Function to generate a 6-digit OTP
function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

//For forgot password
exports.forgotPassword = async (req, res) => {
  const { query, fields } = req.body;
  let user = await User.findOne(query, fields);
  if (user == null) {
    res.send(resFormat.rError(message.forgot_password.invalidEmail))
  }else{
  // generate otp
    const otp = generateOTP();
    user.forgotPasswordOtp = otp
    await user.save();

    // let template = emailTemplates.findOne({code:'forgotPassword'})
    // if (template) {
    //   let params = {
    //     "{firstName}": user.firstName,
    //     "{otp}": otp
    //   }
    //   var mailOptions = {
    //     to: [user.email],
    //     subject: template.mail_subject,
    //     html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
    //   }
    //   sendEmailServices.sendEmail(mailOptions)
    //   res.send(resFormat.rSuccess({ message: message.forgot_password.success, induser: user }))
    // } else {
    //   res.status(401).send(resFormat.rError({ message: message.emailTemplate404 }));
    // }

    res.send(resFormat.rSuccess({ message: message.forgot_password.success, induser: user }))
  }
};


// To verify OTP
exports.verifyOtp = async (req, res) => {
  const { query, fields } = req.body;
  let user = await User.findOne(query, fields);
  if (user==null) {
    res.send(resFormat.rError(message.otp.invalid_otp))
  }else{
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
    user.forgotPasswordOtp = undefined;
    await user.save();
    res.send(resFormat.rSuccess({ token: resetToken, message: message.otp.success }))
  }
};

/**
 * To resend OTP
 */
exports.resendOtp = async (req, res) => {
  const { query, fields } = req.body;
  let user = await User.findOne(query, fields);
  //generate otp
  otp = generateOTP();
  user.forgotPasswordOtp = otp;
  await user.save();

  // emailTemplates.getEmailTemplateByCode('forgotPassword').then((template) => {
  //   if (template) {
  //     let params = {
  //       "{firstName}": user.firstName,
  //       "{otp}": otp
  //     }
  //     var mailOptions = {
  //       to: [user.email],
  //       subject: template.mail_subject,
  //       html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
  //     }
  //     sendEmailServices.sendEmail(mailOptions)
  //     res.send(resFormat.rSuccess({ forgot_password_otp: otp, message: message.otp.resend }))
  //   } else {
  //     res.status(401).send(resFormat.rError({ message: message.emailTemplate404 }));
  //   }
  // })

  res.send(resFormat.rSuccess({ forgot_password_otp: otp, message: message.otp.resend }))
};