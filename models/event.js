const mongoose = require('mongoose');

const eventSchema = {
  name: String,
  date: Date,
  description: String
}

module.exports = mongoose.model('events', eventSchema);