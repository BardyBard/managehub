const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  class: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  category: {
    type: Integer,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    trim: true,
  },
  attachments:{
    type: File
  },
});

module.exports = mongoose.model('registration', registrationSchema);