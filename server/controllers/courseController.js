const CourseModel = require("../models/course")

const courses = async (req, res) => {
    try {
        const allCourses = await CourseModel.find();
        res.json(allCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

const addCourse = async (req, res) => {
  try {
    // Extract data from the request body
    const { videoUrl, courseTitle, courseDescription } = req.body;

    // Create a new course document
    const newCourse = new CourseModel({
      VideoURL: videoUrl,
      VideoTitle: courseTitle,
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

module.exports = {courses, addCourse}