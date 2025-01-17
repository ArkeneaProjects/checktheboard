const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    default: ""
  },
  location: {
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
  createdBy: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: Date,
    default: Date.now
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
  collection: 'hospital'
});

module.exports = mongoose.model('hospital', hospitalSchema);