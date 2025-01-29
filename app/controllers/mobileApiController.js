const User = require('../models/User');
const message = require('../config/messages')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resFormat = require('./../helpers/responseFormat');
const sendEmailServices = require("./../services/sendEmail")
const sendOTPServices = require('./../services/sendOTP');

// Function to generate a 6-digit OTP
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}


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


exports.forgotPassword = async (req, res) => {
    try {
        const { type, value } = req.body;
        let query = { "phone": value }
        let error = message.forgotPassword.phoneNotExist
        if (type == 'email') {
            query = { "email": value }
            error = message.forgotPassword.emailNotExist
        }

        let user = await User.findOne(query, { firstName: 1 });
        if (!user) {
            res.send(resFormat.rError(error))
        } else {
            // generate otp
            const otp = generateOTP();

            if (type == 'email') {
                user.emailOtp = otp
            } else {
                user.phoneOtp = otp
            }
            await user.save();

            if (type == 'email') {
                emailTemplates.getEmailTemplateByCode('forgotPassword').then((template) => {
                    if (template) {
                        let params = {
                            "{firstName}": user.firstName,
                            "{otp}": otp
                        }
                        var mailOptions = {
                            to: [value],
                            subject: template.mailSubject,
                            html: sendEmailServices.generateContentFromTemplate(template.mailBody, params)
                        }
                        //sendEmailServices.sendEmail(mailOptions)
                        res.send(resFormat.rSuccess({ message: message.forgotPassword.successEmail, user: user }))
                    } else {
                        res.status(401).send(resFormat.rError({ message: message.emailTemplate404 }));
                    }
                })
            } else {
                let body = 'Hi, Your OTP code to verify the Phone number for Chechtheboard platform is ' + otp
                //sendOTPServices.sendCode("+1"+value, body)
                res.send(resFormat.rSuccess({ message: message.forgotPassword.successPhone, user: user }))
            }
        }
    } catch (error) {
        console.log("*******error******", error)
        res.status(401).send(resFormat.rError({ message: message.serverError }))
    }
};

exports.signup = async (req, res) => {

}