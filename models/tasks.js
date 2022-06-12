const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
  subject: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  descript: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    trim: true,
  },
  attachments:{
    type: Array,
  },
});

module.exports = mongoose.model('Tasks', TasksSchema);