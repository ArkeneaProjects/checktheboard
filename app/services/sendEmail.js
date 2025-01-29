const constants = require('./../config/constants')
let emailService = {}
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: constants.gmail.email,
    pass: constants.gmail.secret //cbchaiekjqtogdfb
  }
})

emailService.sendEmail = async (mailOptions) => {
  mailOptions.html = '<html><head><link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></head><body style="margin: 0;background: #fff;"><table style="border: 1px solid #ddd; margin: 15px auto;font-family: \'Open Sans\', \'Arial\', \'sans-serif\'; font-size: 13px; color: #2c2c2c; background: #f7f7f7;" width="600" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="background: #f6f7f7;border-bottom: 1px solid #ccc;padding: 0 60px;"><table style="width:100%"><tr><td style="padding: 21px 0; text-align:center"><img src="logo.png" alt="CheckTheBoard" /></td></tr></table></td></tr><tr><td><table style="background: #fff;padding: 20px 60px;" width="600" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-size: 14px;padding-bottom: 26px;"> ' + mailOptions.html + ' </td></tr><tr><td style="line-height: 27px; padding: 17px 0 0;text-align: center;"><br /></td></tr></tbody></table></td></tr><tr><td style="font-size: 14px;padding: 17px;border-top: 1px solid #ccc;text-align: center;background: #f6f7f7;color: #999;font-weight: 600;"><span style="margin: 0;display: block;">© CheckTheBoard 2025</span></td></tr></tbody></table></body></html>';
  mailOptions.from = "Team CheckTheBoard <" + constants.gmail.fromEmail + ">",
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("********Email error: ", error)
      } else {
        console.log("********Email sent to: ", mailOptions.to)
      }
    })
}

//replace dynamic keys with actual values
emailService.generateContentFromTemplate = (content, params) => {
  for (var key in params) {
    content = content.replace(key, params[key])
  }
  return content.trim()
}

module.exports = emailService