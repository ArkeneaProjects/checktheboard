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
  createdOn: {
    type: Date,
    default: Date.now
  },
  code: {
    type: String,
    default: ''
  },
  mailBody: {
    type: String,
    default: ''
  },
  mailSubject: {
    type: String,
    default: ''
  },
}, {
  collection: 'emailTemplates'
});

module.exports = mongoose.model('emailTemplates', emailSchema);