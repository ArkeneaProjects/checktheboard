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
    enum: ['systemAdmin', 'hospitalAdmin', 'salesRep'],
    default: 'salesRep'
  },
  profileImage: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive'
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
    enum: ['Accepted', 'Rejected','Pending'],
    default: "Pending"
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