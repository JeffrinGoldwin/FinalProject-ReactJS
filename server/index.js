const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user")

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/MainProject")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
       
app.get('/getUsers', async (req,res) => {
    try {
        const users = await UserModel.find();
        res.json(users); // Send retrieved users as JSON response
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Handle login request
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await UserModel.findOne({ password });
    const u = await UserModel.find()
    console.log(u)
    console.log(user)
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});