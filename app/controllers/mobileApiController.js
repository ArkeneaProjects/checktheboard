const User = require('../models/User');
const emailTemplates = require('../models/emailTemplates');
const message = require('../config/messages')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resFormat = require('./../helpers/responseFormat');

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
    const { query } = req.body;
    let user = await User.findOne(query, fields);
    if (!user) {
        res.send(resFormat.rError(message.forgotPassword.invalidEmail))
    }
    // generate otp
    const otp = generateOTP();
    user.forgotPasswordOtp = otp
    await user.save();

    emailTemplates.getEmailTemplateByCode('forgotPassword').then((template) => {
        if (template) {
            let params = {
                "{firstName}": user.first_name,
                "{otp}": otp
            }
            var mailOptions = {
                to: [user.email],
                subject: template.mail_subject,
                html: sendEmailServices.generateContentFromTemplate(template.mail_body, params)
            }
            sendEmailServices.sendEmail(mailOptions)
            res.send(resFormat.rSuccess({ message: message.forgotPassword.success, induser: user }))
        } else {
            res.status(401).send(resFormat.rError({ message: message.emailTemplate404 }));
        }
    })
};

exports.signup = async (req, res) => {

}