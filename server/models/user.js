const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/MainProject")
  .then(() => console.log('MongoDB connected uuu'))
  .catch(err => console.error('MongoDB connection error:', err));


const Schema = mongoose.Schema;
const userSchema = new Schema({
  ID: Number,
  FirstName: String,
  LastName: String,
  Email : String,
  Password: String,
  Age : Number,
  Role : String
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
