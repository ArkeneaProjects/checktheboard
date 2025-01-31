const User = require('../models/User');
const message = require('../config/messages')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resFormat = require('./../helpers/responseFormat');
const sendEmailServices = require("./../services/sendEmail")
const sendOTPServices = require('./../services/sendOTP');
const CmsPages = require('../models/CmsPages');

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
            res.send(resFormat.rError({ message: message.login.invalidPassword }))
        } else {
            if (user.hash == undefined || user.hash == null) {
                res.send(resFormat.rError(message.login.invalidPassword))
            } else {
                const isPasswordValid = await bcrypt.compare(hash, user.hash);
                if (!isPasswordValid) {
                    res.send(resFormat.rError({ message: message.login.invalidPassword }))
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

exports.verifyCode = async (req, res) => {
    try {
        const { type, value, otp } = req.body;
        if (!otp || otp == '') {
            res.send(resFormat.rError(message.otp.required))
        } else {
            let query = { "phone": value, phoneOtp: otp }
            if (type == 'email') {
                query = { "email": value, emailOtp: otp }
            }
            let user = await User.findOne(query, { firstName: 1 });
            if (!user) {
                res.send(resFormat.rError(message.otp.invalidOtp))
            } else {
                if (type == 'email') {
                    user.emailOtp = ''
                    user.isEmailVerified = true
                } else {
                    user.phoneOtp = ''
                    user.isMobileVerified = true
                }
                await user.save();
                res.send(resFormat.rSuccess({ message: message.otp.success, user: user }))
            }
        }
    } catch (error) {
        console.log("*******error******", error)
        res.status(401).send(resFormat.rError({ message: message.serverError }))
    }
}

exports.setPassword = async (req, res) => {
    try {
        const { type, value } = req.body;
        if (!value || value == '') {
            res.send(resFormat.rError(message.changePassword.newPassword))
        } else {
            let query = { "phone": value }
            if (type == 'email') {
                query = { "email": value }
            }
            let user = await User.findOne(query, { firstName: 1 });
            if (!user) {
                res.send(resFormat.rError(message.userNotFound))
            } else {
                const hashedPassword = await bcrypt.hash(value, 10);
                user.hash = hashedPassword;
                await user.save();
                res.send(resFormat.rError(message.changePassword.success))
            }
        }
    } catch (error) {
        console.log("*******error******", error)
        res.status(401).send(resFormat.rError({ message: message.serverError }))
    }
}

exports.getCms = async (req, res) => {
    try {
        let cms = await CmsPages.findOne({ "code": req.body.code }, { title: 1, body: 1 });
        if (!cms) {
            res.send(resFormat.rError(message.recordNotFound))
        } else {
            res.send(resFormat.rSuccess(cms))
        }
    } catch (error) {
        console.log("*******error******", error)
        res.status(401).send(resFormat.rError({ message: message.serverError }))
    }
}

exports.getProfile = async (req, res) => {
    try {
        let user = await User.findOne({ "_id": req.body.id }, { "__v": 0, "hash": 0 });
        if (!user) {
            res.send(resFormat.rError(message.userNotFound))
        } else {
            res.send(resFormat.rSuccess(user))
        }
    } catch (error) {
        console.log("*******error******", error)
        res.status(401).send(resFormat.rError({ message: message.serverError }))
    }
}

exports.updateProfile = async (req, res) => {
    try {
        let user = await User.updateOne({ "_id": req.body.id }, { $set: req.body.updateInfo })
        if (!user) {
            res.send(resFormat.rError(message.serverError))
        } else {
            res.send(resFormat.rSuccess({ message: message.userUpdated, user: user }))
        }
    } catch (error) {
        console.log("*******error******", error)
        res.send(resFormat.rError(message.serverError))

    }
}

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, companyName } = req.body
        if (firstName == '' || email == '' || phone == '') {
            res.send(resFormat.rError(message.requiredField))
        } else {
            let userObj = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
            if (userObj == null) {
                let user = new User();
                user.firstName = firstName
                user.lastName = lastName
                user.email = email
                user.phone = phone
                user.hash = await bcrypt.hash(password, 10);
                user.companyName = companyName
                user.save(req.body)
                res.send(resFormat.rSuccess({ message: message.userCreated, user: user }))
            } else {
                let error = message.phoneNumber.duplicate
                if (email == userObj.email) {
                    error = message.email.duplicate
                }
                res.send(resFormat.rError(error))
            }
        }
    } catch (error) {
        console.log("*******error******", error)
        res.status(401).send(resFormat.rError({ message: message.serverError }))
    }
}

exports.isExit = async (req, res) => {
    try {
        const { type, value } = req.body;
        let query = { "phone": value }
        let error = message.phoneNumber.duplicate
        if (type == 'email') {
            query = { "email": value }
            error = message.email.duplicate
        }
        let user = await User.findOne(query, { firstName: 1 });
        if (!user) {
            res.send(resFormat.rSuccess())
        } else {
            res.send(resFormat.rError(error))
        }
    } catch (error) {
        console.log("*******error******", error)
        res.status(401).send(resFormat.rError({ message: message.serverError }))
    }
}

exports.delete = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.body.id });
        res.send(resFormat.rSuccess({ message: message.userDeleted }))
    } catch (error) {
        console.log("*******error******", error)
        res.status(401).send(resFormat.rError({ message: message.serverError }))
    }
}