const UserModel = require("../models/user");
const jwt = require('jsonwebtoken');

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
      const { newPassword } = req.body;
      console.log(req.body);
      console.log(currentUser);
      const updatedUser = await UserModel.findOneAndUpdate(
        { Email: currentUser.Email },
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

const sendOTP = async (req, res) => {
  try{
    const {email} = req.body;
    const user = await UserModel.findOne({ email });
    if(user) {
      
    }
    else {
      res.status(404).json({ error: 'User not found' });
    }

  }
  catch{

  }
}

module.exports = {login, currentUser, changePassword}