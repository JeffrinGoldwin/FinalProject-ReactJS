// Import mongoose and any necessary models
const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/MainProject', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }); 

mongoose.connect('mongodb+srv://Jeffrin:Cj4Uf25ihBEZcqlu@cluster0.1q7i9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define data to be seeded
const user = {FirstName: "Admin", LastName: "123", Email: 'Admin@gmail.com', Password: "Admin", Age:21, Role: "Admin", PasswordChanged: "True"} // Only one user in this example

// Seed data into the database
async function seed() {
  try {
    await User.create(user); // Insert a single user document
    console.log('Data seeding complete');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database after seeding
  }
}

seed(); // Call the seed function to start the seeding process
