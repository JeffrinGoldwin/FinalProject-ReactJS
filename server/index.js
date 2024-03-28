const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const generateRandomString = (length) => {
  // Define the character set from which to generate the random string
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Initialize an empty string to store the random string
  let randomString = "";

  // Loop through the length specified and randomly select characters
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

mongoose
  .connect(
    "mongodb+srv://Jeffrin:Cj4Uf25ihBEZcqlu@cluster0.1q7i9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
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
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    //   console.log(user)
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (password === user.password) {
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
    const { firstName, lastName, email, password, age, role, passwordChanged } = req.body;
    // console.log(req.body)
    const newUser = new UserModel({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: generateRandomString(12),
      Age: age,
      Role: role,
      PasswordChanged: "False",
    });

    // Save the user to the database
    await newUser.save();

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});