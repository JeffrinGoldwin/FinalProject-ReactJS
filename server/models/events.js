const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const eventSchema = new Schema({
  EventName: String,
  Time: String,
  EventStartDate: String,
  EventEndDate: String,
  Venue: String,
  Description: String,
  Accepted : Number,
  Rejected : Number,
  Maybe : Number,
});

const EventModel = mongoose.model('events', eventSchema);

module.exports = EventModel;
