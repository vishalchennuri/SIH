//index.js 
const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const farmerRoutes = require('./routes/farmerRoutes')


dotEnv.config()
const PORT = process.env.PORT

const URL = process.env.URL
const app = express()


// Connecting to MongoDB
mongoose.connect(URL)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  app.use(bodyParser.json());
  app.use('/farmer',farmerRoutes);

app.listen(PORT , ()=>{
    console.log(`The server has started running at ${PORT} `)
})

