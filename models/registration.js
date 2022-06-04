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
  type: {
    type: Integer,
    trim: true,
  }
});

module.exports = mongoose.model('registration', registrationSchema);