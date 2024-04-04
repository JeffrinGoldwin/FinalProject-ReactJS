const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const skillSchema = new Schema({
  FirstName: String,
  Email : String,
  Skill: String,
  Experience: String,
});

const SkillModel = mongoose.model('skills', skillSchema);

module.exports = SkillModel;
