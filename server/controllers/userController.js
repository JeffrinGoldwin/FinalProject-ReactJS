const UserModel = require('../models/user');
const { generateRandomString } = require('../utils/GenerateRandomPassword');
const sendEmail = require('../utils/SendMail');

const createUser = async (req, res) => {
    try {
        console.log("hi")
        const { firstName, lastName, email, password, age, role, passwordChanged } =
          req.body;
        const randomPassword = generateRandomString(12);
        const newUser = new UserModel({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Password: randomPassword,
          Age: age,
          Role: role,
          PasswordChanged: "False",
        });
        await newUser.save();
        const emailText = `Hello ${firstName},\n\nYour account has been created successfully.\n\nYour password is: ${randomPassword} \n\nWebsite Link : http://localhost:3000/login`;
        await sendEmail(email, "Account Created", emailText);
        res.status(201).json({ message: "User created successfully", user: newUser });
      } catch (error) {
        console.log("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};

const getUser = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
      } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};

module.exports = {createUser, getUser};