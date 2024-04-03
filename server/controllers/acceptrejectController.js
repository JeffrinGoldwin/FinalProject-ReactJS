const AcceptRejectModel = require('../models/AcceptRejectModel')

const addAcceptReject = async (req, res) => {
    try {
        const { Email, EventName, AcceptOrReject } = req.body;
        const newAcceptReject = new AcceptRejectModel({
          Email,
          EventName,
          AcceptOrReject,
        });
        const savedAcceptReject = await newAcceptReject.save();
        res.status(201).json(savedAcceptReject);
      } catch (error) {
        console.error("Error adding accept/reject data:", error);
        res.status(500).json({ error: "Failed to add accept/reject data" });
      }
}

const checkAcceptReject = async (req, res) => {
    try {
        const { email, eventName } = req.query;
        const acceptReject = await AcceptRejectModel.findOne({
          Email: email,
          EventName: eventName,
        });
        res.json(acceptReject);
      } catch (error) {
        console.error("Error checking accept/reject:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

module.exports = {addAcceptReject, checkAcceptReject}