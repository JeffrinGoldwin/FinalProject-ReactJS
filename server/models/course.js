const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const courseSchema = new Schema({
  VideoURL: String,
  VideoTitle: String,
  VideoDescription: String
});

const UserModel = mongoose.model('courses', courseSchema);

module.exports = UserModel;
