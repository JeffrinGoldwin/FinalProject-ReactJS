const EventModel = require('../models/events');
const AcceptRejectModel = require('../models/AcceptRejectModel');
const UserModel = require('../models/user');
const {sendEmail} = require('../utils/SendMail');
const transporter = require('../utils/Transporter');

const events = async (req, res) => {
  try {
      const allEvents = await EventModel.find();
      res.status(200).json(allEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

const addEvent = async (req, res) => {
  try {
    const {
      EventName,
      StartTime,
      EndTime,
      EventStartDate,
      EventEndDate,
      TrainerName,
      TrainerEmail,
      Venue,
      Capacity,
      Description,
      Accepted,
      Rejected,
      Maybe,
    } = req.body;
    
    const newEvent = await new EventModel({
      EventName: EventName,
      StartTime: StartTime,
      EndTime: EndTime,
      EventStartDate: EventStartDate,
      EventEndDate: EventEndDate,
      TrainerName: TrainerName,
      TrainerEmail: TrainerEmail,
      Venue: Venue,
      Capacity: Capacity,
      Description: Description,
      Accepted: Accepted,
      Rejected: Rejected,
      Maybe: Maybe,
    });

    console.log(newEvent)

    // Save the new event to the database
    const savedEvent = await newEvent.save();

    //Email
    const users = await UserModel.find({}, "Email");
    for (const user of users) {
      if(user.Role === "User"){

        const email = user.Email;
        const emailText = `Hello ,\n\nNew Event has been Added\n\nWebsite Link : http://localhost:3000/Events`;
        
        try {
          // Send email to the current user
          await sendEmail(email, "New Event", emailText, transporter);
          console.log(`Email sent successfully to ${email}`);
        } catch (error) {
          console.error(`Error sending email to ${email}:`, error);
        }
      }
    }
    
    
    const email = savedEvent.TrainerEmail;
    const emailText = `Hello ${savedEvent.TrainerName} ,\n\nYou have been assigned as a trainer for a event\n\nWebsite Link : http://localhost:3000/Events`;
    await sendEmail(email, "Event Trainer", emailText, transporter);
    
    // Send success response
    res.status(201).json(savedEvent);
  } catch (error) {
    // Handle error
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEventData = req.body;

    console.log(updatedEventData);
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      updatedEventData,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    const acceptedEmployees = await AcceptRejectModel.find({ EventName: updatedEvent.EventName, AcceptOrReject: "1" });

    acceptedEmployees.forEach(async (employee) => {
      try {
        // Email content
        const emailText = `Dear ${employee.Email},\n\n${updatedEvent.EventName} Has been updated. Check it in the portal\n\nThank you.`;
        // Send the email
        await sendEmail(employee.Email, "New Event", emailText, transporter);
      } catch (error) {
        console.error("Error sending email to", employee.Email, ":", error);
      }
    });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const updateEventStatus = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const updatedEventData = req.body;
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      updatedEventData,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
} 

const deleteEvent = async (req, res) => {
  try{
    const eventId = req.params.eventId;
    const deletedEvent = await EventModel.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const sendIntrestedMail = async (req, res) => {
  try {
    const { name, subject, body, eventName } = req.body;
    const emailText = `Hello,\n\n${name} is intrested in ${eventName}.`;
    await sendEmail("jeffcrjj@gmail.com", "Account Created", body, transporter);
    console.log("Email sent successfully");
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
}

const eventAlmostFull = async (req, res) => {
  const users = await UserModel.find({}, "Email");
  for (const user of users) {
    const email = user.Email;
    const emailText = `Hello ,\n\Event is almost full. Visit website to register\nWebsite Link : http://localhost:3000/Events`;
    try {
      await sendEmail(email, "New Event", emailText, transporter);
      console.log(`Email sent successfully to ${email}`);
      res.status(200).send("Done")
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
    }
  }
}

const confirmation = async (req, res) => {
  try {
    const { Email, EventName } = req.body;
    const emailText = `Hello ,\n\nYou have been registered for the event ${EventName}.\n\nWebsite Link : http://localhost:3000/login`;
    await sendEmail(Email, "Account Created", emailText, transporter);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {events, addEvent, updateEvent, updateEventStatus, deleteEvent, sendIntrestedMail, eventAlmostFull, confirmation}