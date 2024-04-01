const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const acceptRejectSchema = new Schema({
  Email : String,
  EventName: String,
  AcceptOrReject: String
});

const AcceptRejectModel = mongoose.model('acceptreject', acceptRejectSchema);

module.exports = AcceptRejectModel;
