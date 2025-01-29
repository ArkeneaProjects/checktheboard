const constants = require('./../config/constants')
const client = require('twilio')(constants.twilioCredentials.accountSid, constants.twilioCredentials.authToken);
var otp = {}

otp.sendCode = (toNumber, body) => {
    if (constants.twilioCredentials.isDevAccount) {
        toNumber = '+919579784082'
    }
    client.messages.create({
        body: body,
        to: toNumber,
        from: constants.twilioCredentials.fromNumber // From a valid Twilio number
    }, error => {
        if (error) {
            console.log('******TwilioError****' + error)
        } else {
            console.log('*******Twilio-Sent*****', toNumber)
        }
    }).then((message) => {
    });
}

//send bulk sms
otp.sendBulkSMS = (notificationOpts) => {
    client.notify.v1.services(constants.twilioCredentials.service_sid)
        .notifications.create(notificationOpts)
        .then(notification => console.log('*******Twilio SMS-Sent*****', notification.sid))
        .catch(error => console.log('******Twilio Error****' + error));
}

module.exports = otp
