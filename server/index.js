const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user")

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())
app.use(express.json())
       
app.get('/getUsers', async (req,res) => {
    try {
        const users = await UserModel.find();
        res.json(users); // Send retrieved users as JSON response
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});