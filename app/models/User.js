const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: {
    required: true,
    type: String,
    lowercase: true //stored email in lowercase.
  },
  userType: {
    type: String,
    default: 'salesRep' //'systemAdmin', 'hospitalAdmin', 'salesRep'
  },
  profileImage: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: 'Inactive' //'Active', 'Inactive'
  },
  phone: {
    type: String,
    default: ""
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  myHospital:{
    type: Array,
    default: []
  },
  adminStatus: {
    type: String,
    default: "Pending" //'Accepted', 'Rejected','Pending'
  },
  hash: String,
  token: String,
  resetToken: String,
  forgotPasswordOtp: String,
  changeEmailOtp: String,
  changePhoneOtp: String,
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  },
  isFirstLogin: {
    type: Boolean,
    default: false
  },
  fcmToken: {
    type: String,
    default: ''
  },
}, {
  collection: 'users'
});

module.exports = mongoose.model('users', userSchema);