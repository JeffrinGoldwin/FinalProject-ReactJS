const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const routes = require('./routes/routes')
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/', routes)

mongoose
  .connect(
    "mongodb+srv://Jeffrin:Cj4Uf25ihBEZcqlu@cluster0.1q7i9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

