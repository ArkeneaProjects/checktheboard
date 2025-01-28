const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  
  type: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    lowercase: true //stored email in lowercase.
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  modified_on: {
    type: Date,
    default: Date.now
  },
  code: {
    type: String,
    default: ''
  },
  mail_body: {
    type: String,
    default: ''
  },
  mail_subject: {
    type: String,
    default: ''
  },
}, {
  collection: 'emailTemplates'
});

module.exports = mongoose.model('emailTemplates', emailSchema);