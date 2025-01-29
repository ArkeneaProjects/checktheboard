const User = require('../models/User');
const emailTemplates = require('../models/emailTemplates');
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

 