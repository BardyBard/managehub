const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  admin: {
    type: Boolean
  }
});

module.exports = mongoose.model('Accounts', TasksSchema);