const mongoose = require("mongoose")
const constants = require("./../config/constants")
var dbURI = constants.database.url
mongoose.set('debug', true) //set false at live server.
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(dbURI , options)
.then(() => console.log('**************MongoDB connected**************'))
.catch(err => console.error('**************MongoDB connection error**************', err));