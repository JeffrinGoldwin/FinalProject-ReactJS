const mongoose = require('mongoose');
const CourseModel = require('../models/course');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Jeffrin:Cj4Uf25ihBEZcqlu@cluster0.1q7i9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Function to seed data
const seedData = async () => {
  try {
    // Sample data to seed
    const usersData = [
        { VideoURL: 'https://youtu.be/xk4_1vDrzzo?si=-R0OldEiYYW6Umb3', VideoTitle: 'Java' , VideoDescription: 'Java is a popular programming language. Java is used to develop mobile apps, web apps, desktop apps, games and much more'},
        { VideoURL: 'https://youtu.be/_uQrJ0TkZlc?si=FQfPJlTAzKinYmNQ', VideoTitle: 'Python' , VideoDescription: 'Python is a popular programming language. Python can be used on a server to create web applications'}
    ];

    // Create documents using CourseModel.create()
    const createdUsers = await CourseModel.create(usersData);

    console.log('Courses seeded successfully:', createdUsers);
  } catch (error) {
    console.error('Error seeding courses:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedData();
