const UserModel = require("../models/user");
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/SendMail')

let LoggedUser = null;

const createToken = (id) => {
    return jwt.sign({ id }, "jeffrin", {
        expiresIn: 3600000,
    });
};


const login = async (req, res) => {
    const { Email, Password } = req.body;
    console.log(req.body);
    try {
        const users = await UserModel.findOne({ Email: Email });
        if (!users) {
            return res.status(404).json({ error: "User not found" });
        }
        if (Password === users.Password && Email === users.Email) {
            LoggedUser = users;
            console.log(LoggedUser);
            const token = createToken(users._id);
            return res.status(200).json({ message: "Login successful", token: token});
        } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const currentUser = async (req, res) => {
    if (LoggedUser) {
        res.status(200).json(LoggedUser);
      } else {
        res.status(404).json({ error: "No user logged in" });
      }
}

const changePassword = async (req, res) => {
  try {
      const { newPassword, email } = req.body;
      console.log(req.body);
      const updatedUser = await UserModel.findOneAndUpdate(
        { Email: email },
        { Password: newPassword, PasswordChanged: "True" }
      );
      console.log("New Password", newPassword);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

const forgotPassword = async (req, res) => {
  try{
    // const { email } =  req.body;
    const email  =  "jeffrin.2005031@srec.ac.in"
    const emailText = `Hello/n/nYou have requested for a change password request. Ckick the link below to change password/n/nLink : http://localhost:3000/ChangePassword?email=${email}`;
    await sendEmail(email, "Forgot Password", emailText);
    res.status(200).json({message: "Email sent"})
    console.log("Sent Email")
  }
  catch(error){
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error)
  }
}

module.exports = {login, currentUser, changePassword, forgotPassword}