const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    default: ""
  },
  addressOne: {
    type: String,
    default: ""
  },
  addressTwo: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  zipcode: {
    type: String,
    default: ""
  },
  email: {
    required: true,
    type: String,
    lowercase: true //stored email in lowercase.
  },
  phone: {
    type: String,
    default: ""
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  },
}, {
  collection: 'hospitals'
});

module.exports = mongoose.model('hospital', hospitalSchema);