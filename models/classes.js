const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Classes', TasksSchema);