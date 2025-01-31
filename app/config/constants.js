require('dotenv').config();
var constants = {
  PORT: process.env.PORT,
  database: {
    url: process.env.DATABASE //value set in .env file
  },
  clientUrl: process.env.CLIENT_URL,
  gmail: {
    email: process.env.EMAIL,
    secret: process.env.SECRET,
    fromEmail: process.env.FROM_EMAIL,
  },
  twilioCredentials: {
    isDevAccount: true,  
    accountSid: "ACc7443562d23238b93a41f",
    authToken: "61a1e23232b7f31aefa8",  
    fromNumber: "+122323232",
    service_sid:"1230123" 
  },
  dateFormat:'m/d/Y'
}

module.exports = constants