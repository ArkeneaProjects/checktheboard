var mongoose = require('mongoose')

var cmsSchema = new mongoose.Schema({
  code: String,
  title: String,
  body: String,
  status: String,
  createdOn: Date,
  updatedOn: Date
}, {
  collection: 'cmsPages'
})
module.exports = mongoose.model('cmsPages', cmsSchema)