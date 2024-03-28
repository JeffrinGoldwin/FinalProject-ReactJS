const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  FirstName: String,
  LastName: String,
  Email : String,
  Password: String,
  Age : Number,
  Role : String,
  PasswordChanged : String
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
