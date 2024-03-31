const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user");
const CourseModel = require("./models/course");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const { generateRandomString } = require("./utils/GenerateRandomPassword");
const { sendEmail } = require("./utils/SendMail");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

let currentUser = null;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "jeffcrjj@gmail.com",
    pass: "coje liob nvxx dbgk",
  },
});

const createToken = (id) => {
  return jwt.sign({ id } , 'jeffrin' , {
    expiresIn: 3600000
  })
} 

mongoose
  .connect(
    "mongodb+srv://Jeffrin:Cj4Uf25ihBEZcqlu@cluster0.1q7i9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users); // Send retrieved users as JSON response
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  console.log(req.body);
  try {
    const users = await UserModel.findOne({ Email: Email });
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    if (Password === users.Password && Email === users.Email) {
      currentUser = users;
      console.log(users);
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(bodyParser.json());
app.post("/createUser", async (req, res) => {
  try {
    // const { first_Name, last_Name, email, password, age, role, passwordChanged } = req.body;
    const { firstName, lastName, email, password, age, role, passwordChanged } =
      req.body;
    const randomPassword = generateRandomString(12);
    // console.log(req.body)
    const newUser = new UserModel({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: randomPassword,
      Age: age,
      Role: role,
      PasswordChanged: "False",
    });

    // Save the user to the database
    await newUser.save();
    const emailText = `Hello ${firstName},\n\nYour account has been created successfully.\n\nYour password is: ${randomPassword} \n\nWebsite Link : http://localhost:3000/login`;
    await sendEmail(email, "Account Created", emailText, transporter);

    // const token = createToken(newUser._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: 3600000})

    // Respond with success message
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/currentUser", (req, res) => {
  if (currentUser) {
    // console.log(currentUser)
    res.status(200).json(currentUser);
  } else {
    res.status(404).json({ error: "No user logged in" });
  }
});

app.get("/courses", async (req, res) => {
  try{
    const courses = await CourseModel.find();
    res.json(courses);
  } catch(error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
});

app.post('/changePassword', async (req, res) => {
    try {
      const { newPassword } = req.body;
      console.log(req.body);
      console.log(currentUser);
      const updatedUser = await UserModel.findOneAndUpdate(
        { Email: currentUser.Email },
        { Password: newPassword, PasswordChanged : "True" }
        
      );
      console.log("New Password",newPassword)
      if (!updatedUser) {
        // If no user was found with the specified email
        return res.status(404).json({ error: 'User not found' });
      }
      // Send a success response
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      // Handle any errors
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/addCourse', async (req, res) => {
    try {
        // Extract data from the request body
        const { videoUrl, courseTitle, courseDescription } = req.body;

        // Create a new course document
        const newCourse = new CourseModel({
            VideoURL: videoUrl,
            VideoTitle: courseTitle,
            VideoDescription: courseDescription
        });

        // Save the new course to the database
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
