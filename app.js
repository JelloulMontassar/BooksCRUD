const express = require("express");
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const bookRoute  = require('./routes/books')
const authRoute = require('./routes/auth')
const authorRoute = require('./routes/author')
mongoose.connect("mongodb://127.0.0.1:27017/books")
.then(() => console.log('Connected!'));
app.use(express.json())
app.use("/api/author",authorRoute);
app.use("/api/books",bookRoute);
app.use("/api/auth",authRoute);
/* const corsOptions = {
    origin: '127.0.0.1:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions)); */
module.exports =app;