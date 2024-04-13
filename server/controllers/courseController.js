const CourseModel = require("../models/course")
const UserModel = require("../models/user")
const {sendEmail} = require("../utils/SendMail")
const transporter = require("../utils/Transporter")

const courses = async (req, res) => {
    try {
        const allCourses = await CourseModel.find();
        res.json(allCourses);
      } catch (error) {
        console.log("Error fetching courses:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

const addCourse = async (req, res) => {
  try {
    // Extract data from the request body
    const { videoUrl, courseTitle, courseDifficulty, courseDescription } = req.body;

    // Create a new course document
    const newCourse = new CourseModel({
      VideoURL: videoUrl,
      VideoTitle: courseTitle,
      VideoDifficulty: courseDifficulty,
      VideoDescription: courseDescription,
    });

    // Save the new course to the database
    const savedCourse = await newCourse.save();

    //Email
    const users = await UserModel.find({}, "Email");
    for (const user of users) {
      const email = user.Email;
      const Name = user.FirstName;
      const emailText = `Hello ${Name},\n\nNew Couurse has been Added\n\nWebsite Link : http://localhost:3000/Course`;

      try {
        // Send email to the current user
        await sendEmail(email, "New Course", emailText, transporter);
        console.log(`Email sent successfully to ${email}`);
      } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
      }
    }
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const editCourse = async (req, res) => {
  const updatedData = req.body.updatedData;

  try {
    console.log(req.body.updatedData)
      const updatedCourse = await CourseModel.findByIdAndUpdate(updatedData._id, updatedData, { new: true });

      if (!updatedCourse) {
          return res.status(404).json({ error: 'Course not found' });
      }
      res.json(updatedCourse);
  } catch (error) {
      console.error('Error updating video data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCourse = async (req, res) => {
  try{
    const courseId = req.params.id;
    const deletedCourse = await CourseModel.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchIndividualCourse = async (req, res) => {
  try {
    const { ID : ID } = req.body;
    const videoData = await CourseModel.findOne({ _id: ID });
    if (!videoData) {
      return res.status(404).json({ message: 'video not found' });
    }
    res.status(200).json(videoData);
  } catch (error) {
    console.error('Error fetching video data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {courses, addCourse, editCourse, deleteCourse,fetchIndividualCourse}