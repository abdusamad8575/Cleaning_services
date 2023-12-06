const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use('/', usersRouter);

const mongodbURL = process.env.MONGODB;   
const PORT = process.env.PORT;

mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT)
  console.log(`Connected to MongoDB ${PORT}`);
})
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  })





module.exports = app;
