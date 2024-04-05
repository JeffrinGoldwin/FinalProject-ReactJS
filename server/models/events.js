const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const eventSchema = new Schema({
  EventName: String,
  StartTime: String,
  EndTime: String,
  EventStartDate: String,
  EventEndDate: String,
  TrainerName : String,
  TrainerEmail : String,
  Venue: String,
  Capacity: Number,
  Description: String,
  Accepted : Number,
  Rejected : Number,
  Maybe : Number,
});

const EventModel = mongoose.model('events', eventSchema);

module.exports = EventModel;
